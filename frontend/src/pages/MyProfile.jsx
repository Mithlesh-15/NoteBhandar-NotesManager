import React, { useState } from "react";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Mithlesh Kumar",
    email: "mithlesh@example.com",
    college: "ABC Engineering College",
    bio: "Final year student. I upload notes and useful study resources.",
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateOrSave = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-purple-100 bg-white/80 p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-200 bg-purple-100 text-3xl font-semibold text-purple-700 sm:h-28 sm:w-28">
            {profile.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-purple-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={!isEditing}
              className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-50/60"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-purple-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-xl border border-purple-200 bg-purple-50/70 px-3 py-2.5 text-sm text-purple-900 outline-none disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-red-600">Email cannot be changed.</p>
          </div>

          <div>
            <label htmlFor="college" className="mb-1 block text-sm font-medium text-purple-700">
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
            <label htmlFor="bio" className="mb-1 block text-sm font-medium text-purple-700">
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

          <button
            type="button"
            onClick={handleUpdateOrSave}
            className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            {isEditing ? "Save" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
