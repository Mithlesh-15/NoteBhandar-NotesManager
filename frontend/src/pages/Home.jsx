import React from "react";

function Home() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-[#f6e7d8] px-4 pb-24 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
      <div className="w-full max-w-md">
        <p className="mb-2 text-sm font-medium text-gray-700">Select College</p>
        <select
          className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
          defaultValue="personal"
        >
          <option value="personal">Personal Notes</option>
          <option value="study">Study Notes</option>
          <option value="work">Work Notes</option>
        </select>
      </div>
      <div className="w-full max-w-md">
        <p className="mb-2 text-sm font-medium text-gray-700">Select Course</p>
        <select
          className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
          defaultValue="personal"
        >
          <option value="personal">Personal Notes</option>
          <option value="study">Study Notes</option>
          <option value="work">Work Notes</option>
        </select>
      </div>
      <div className="w-full max-w-md">
        <p className="mb-2 text-sm font-medium text-gray-700">Select Subject</p>
        <select
          className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
          defaultValue="personal"
        >
          <option value="personal">Personal Notes</option>
          <option value="study">Study Notes</option>
          <option value="work">Work Notes</option>
        </select>
      </div>

      {/* fetch button */}

      <div className="w-full max-w-md flex justify-center">
        <button
          type="button"
          className="mt-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md cursor-pointer transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#f6e7d8]"
        >
          Find
        </button>
      </div>
    </div>
  );
}

export default Home;
