import React, { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const OWNER_AVATAR_KEY = "ownerProfileAvatar";
const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/0d/5f/db/0d5fdb930b2376a39e36ae11abc304d6.jpg";

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(
    () => localStorage.getItem(OWNER_AVATAR_KEY) || DEFAULT_AVATAR,
  );

  useEffect(() => {
    const syncAvatar = () => {
      const storedAvatar = localStorage.getItem(OWNER_AVATAR_KEY);
      setProfileAvatar(storedAvatar || DEFAULT_AVATAR);
    };

    window.addEventListener("profile-avatar-updated", syncAvatar);
    window.addEventListener("storage", syncAvatar);
    return () => {
      window.removeEventListener("profile-avatar-updated", syncAvatar);
      window.removeEventListener("storage", syncAvatar);
    };
  }, []);

  return (
    <>
      <header className="w-full h-16 bg-purple-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <h1
            className="text-xl font-bold tracking-wide cursor-pointer"
            onClick={() => navigate("/")}
          >
            NoteBhandar
          </h1>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <Link
              to={'/our-contributers'}
                type="button"
                className="p-2 cursor-pointer"
                aria-label="Contributors"
                title="Contributors"
              >
                <Crown size={20} />
              </Link>
              <span className="pointer-events-none absolute top-full right-0 mt-1 rounded bg-black px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Contributors
              </span>
            </div>

            <button
              type="button"
              className="flex flex-col justify-center items-center gap-1.5 p-2 cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              <span className="w-6 h-0.5 bg-white rounded" />
              <span className="w-6 h-0.5 bg-white rounded" />
              <span className="w-6 h-0.5 bg-white rounded" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white text-gray-800 z-50 shadow-xl transition-transform duration-300 flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-5 border-b flex items-center justify-between">
          <p className="font-semibold text-lg text-purple-600">NoteBhandar</p>
          <button
            type="button"
            className="text-2xl leading-none cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <div className="px-5 py-6 border-b border-gray-100 flex flex-col items-center">
          <img
            src={profileAvatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
          />
          <Link
            to="/profile/0nkqp94v"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center py-2 text-center rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
          >
            My Profile
          </Link>
          <button
          onClick={()=>(navigate('/contributions'))}
            type="button"
            className="mt-3 w-full py-2 rounded-md bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors duration-200 cursor-pointer"
          >
            My Contribution
          </button>
          <button
            type="button"
            className="mt-3 w-full py-2 rounded-md bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors duration-200 cursor-pointer"
          >
            Feedback
          </button>
        </div>

        <a
          href="#"
          className="mt-auto px-5 py-4 text-xs text-gray-400 border-t border-gray-100 hover:text-gray-500 transition-colors duration-200"
        >
          owner of this pletform
        </a>
      </aside>
    </>
  );
}

export default NavBar;
