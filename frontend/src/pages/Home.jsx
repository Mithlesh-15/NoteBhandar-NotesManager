import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-[#f6e7d8] px-4 pb-24 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
      <div className="w-full max-w-md">
        <p className="mb-2 text-sm font-medium text-gray-700">Choose Category</p>
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
        <p className="mb-2 text-sm font-medium text-gray-700">Choose Category</p>
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
        <p className="mb-2 text-sm font-medium text-gray-700">Choose Category</p>
        <select
          className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
          defaultValue="personal"
        >
          <option value="personal">Personal Notes</option>
          <option value="study">Study Notes</option>
          <option value="work">Work Notes</option>
        </select>
      </div>
    </div>
  );
}

export default Home;
