import React from "react";
import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

function NotFound() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-[#f6e7d8] px-4 py-6 sm:py-10">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-3xl border border-[#efcfa8] bg-[#fff9f2] p-6 shadow-[0_20px_40px_rgba(93,63,136,0.14)] sm:p-10">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f7d6b2]/60 blur-xl" />
          <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-purple-200/40 blur-xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d5c2ef] bg-white text-[#6b4f91]">
              <SearchX size={30} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b6db7]">
              Error 404
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#5d3f88] sm:text-4xl">
              Page Not Found
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#7a6b61] sm:text-base">
              The page you are looking for may have been moved, deleted, or the
              URL may be incorrect. Go back to the home page and try again.
            </p>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/find"
                className="inline-flex w-full items-center justify-center rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" />
                Go To Home
              </Link>
              <Link
                to="/add-new"
                className="inline-flex w-full items-center justify-center rounded-xl border border-[#d2b1ff] bg-white px-5 py-2.5 text-sm font-semibold text-[#6b4f91] transition hover:bg-[#f8f1ff] sm:w-auto"
              >
                Add New Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
