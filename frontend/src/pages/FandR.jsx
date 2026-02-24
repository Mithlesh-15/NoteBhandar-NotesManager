import React from "react";

function FandR() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-xl rounded-xl border border-purple-100 bg-white/80 p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-purple-900 sm:text-xl">Feedback</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-purple-700">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-1 block text-sm font-medium text-purple-700">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Enter subject"
              className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-purple-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your feedback or request..."
              className="w-full resize-none rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default FandR;
