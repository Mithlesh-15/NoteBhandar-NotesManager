import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

const MAX_PROFILE_SIZE = 4 * 1024 * 1024;
const OWNER_AVATAR_KEY = "ownerProfileAvatar";

function MyProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [owner, setOwner] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    college: "",
    bio: "",
    avatar: "https://i.pinimg.com/736x/0d/5f/db/0d5fdb930b2376a39e36ae11abc304d6.jpg",
  });
  const [originalProfile, setOriginalProfile] = useState({
    fullname: "",
    email: "",
    college: "",
    bio: "",
    avatar: "",
  });

  const persistOwnerAvatar = (avatarUrl) => {
    try {
      if (avatarUrl) {
        localStorage.setItem(OWNER_AVATAR_KEY, avatarUrl);
      } else {
        localStorage.removeItem(OWNER_AVATAR_KEY);
      }
      window.dispatchEvent(new Event("profile-avatar-updated"));
    } catch (error) {
      console.error("Unable to persist owner avatar:", error);
    }
  };

  const imagePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return profile.avatar;
  }, [profile.avatar, selectedImage]);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, selectedImage]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await api.post("/api/v1/profile/details", { id });
        const data = response?.data;

        if (!data?.success || !data?.user) {
          throw new Error("Invalid profile response");
        }

        const isOwnerProfile = Boolean(data.owner);
        setOwner(isOwnerProfile);
        const mappedProfile = {
          fullname: data.user.fullname || "",
          email: data.user.email || "",
          college: data.user.college || "",
          bio: data.user.bio || "",
          avatar: data.user.avatar || "",
        };
        setProfile(mappedProfile);
        setOriginalProfile(mappedProfile);
        if (isOwnerProfile) {
          persistOwnerAvatar(mappedProfile.avatar);
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 404) {
          navigate("/login", { replace: true });
          return;
        }
        navigate("/find", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    } else {
      navigate("/find", { replace: true });
    }
  }, [id, navigate]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_PROFILE_SIZE) {
      setErrorMessage("Profile photo size must be 4MB or less.");
      e.target.value = "";
      return;
    }

    setErrorMessage("");
    setSelectedImage(file);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("fullname", profile.fullname);
      formData.append("college", profile.college);
      formData.append("bio", profile.bio);
      if (selectedImage) {
        formData.append("profilePhoto", selectedImage);
      }

      const response = await api.put("/api/v1/profile/update", formData);
      const data = response?.data;

      if (!data?.success || !data?.user) {
        throw new Error("Profile update failed");
      }

      const updatedProfile = {
        fullname: data.user.fullname || "",
        email: data.user.email || "",
        college: data.user.college || "",
        bio: data.user.bio || "",
        avatar: data.user.avatar || "",
      };
      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      if (owner) {
        persistOwnerAvatar(updatedProfile.avatar);
      }
      setSelectedImage(null);
      setIsEditing(false);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to update profile.";
      setErrorMessage(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      {saving && <Loading />}
      <div className="min-h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-purple-100 bg-white/90 p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col items-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-purple-200 bg-purple-100 sm:h-28 sm:w-28">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-purple-700">
                  {profile.fullname?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            {owner && isEditing && (
              <label className="mt-3 inline-flex cursor-pointer rounded-md bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-200">
                Upload Photo (max 4MB)
                <input
                  type="file"
                  accept="image/png,image/jpg,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="fullname"
                className="mb-1 block text-sm font-medium text-purple-700"
              >
                Name
              </label>
              <input
                id="fullname"
                type="text"
                value={profile.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                disabled={!isEditing}
                className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-50/60"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-purple-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="w-full rounded-xl border border-purple-200 bg-purple-50/70 px-3 py-2.5 text-sm text-purple-900 outline-none disabled:cursor-not-allowed"
              />
              {isEditing && (
                <p className="mt-1 text-xs text-red-600">
                  Email cannot be changed.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="college"
                className="mb-1 block text-sm font-medium text-purple-700"
              >
                College
              </label>
              <input
                id="college"
                type="text"
                value={profile.college}
                onChange={(e) => handleChange("college", e.target.value)}
                disabled={!isEditing}
                className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-50/60"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-1 block text-sm font-medium text-purple-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                disabled={!isEditing}
                className="w-full resize-none rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-50/60"
              />
            </div>

            {errorMessage && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {owner && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:col-span-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedImage(null);
                        setErrorMessage("");
                        setProfile(originalProfile);
                      }}
                      className="w-full rounded-xl bg-purple-100 px-4 py-2.5 text-sm font-semibold text-purple-700 transition-all duration-200 hover:bg-purple-200"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
