import React from "react";
import { Chrome } from "lucide-react";
import { auth, googleProvider } from "../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6e7d8] px-3 py-6 sm:px-4 sm:py-8">
      <div className="w-full max-w-md rounded-2xl border border-purple-100 bg-white p-4 shadow-lg shadow-purple-100 sm:p-6">
        <h1 className="mb-1 text-center text-lg font-semibold text-purple-900 sm:text-xl">
          Uploader Login
        </h1>
        <p className="mb-5 text-center text-xs text-purple-600">
          If you want to upload notes, please login.
        </p>

        <button
          type="button"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-3 py-3 text-sm font-semibold text-purple-800 shadow-sm transition hover:bg-purple-100"
          onClick={async ()=>{
            await signInWithPopup(auth, googleProvider)
            console.log(auth)
          }}
        >
          <Chrome className="h-4 w-4 text-purple-600" />
          Enter Your GMail
        </button>

        <form className="space-y-4">
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
              placeholder="Enter your college name"
              className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
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
              placeholder="Write a short bio..."
              className="w-full resize-none rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <p className="text-center text-xs leading-relaxed text-red-600">
            We use your email only to contact you about your uploads. It will never be shared publicly.
          </p>
          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
