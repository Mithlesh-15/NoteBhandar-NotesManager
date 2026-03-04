import React, { useState } from "react";
import { Star } from "lucide-react";
import Loading from "../components/Loading.jsx"

function MyContribution() {
  const [loading, setLoading] = useState(false)
  const resources = [
    { name: "Operating System Notes", stars: 128 },
    { name: "DBMS Quick Revision", stars: 96 },
    { name: "Computer Network One Shot", stars: 142 },
    { name: "DSA in Hindi Playlist", stars: 189 },
    { name: "React Complete Course", stars: 173 },
    { name: "System Design Basics", stars: 114 },
    { name: "Aptitude 100 Questions", stars: 88 },
    { name: "SQL Practice Sheet", stars: 77 },
    { name: "C Programming Test Set", stars: 69 },
    { name: "Last Night Revision", stars: 101 },
    { name: "PYQ Solved Set", stars: 154 },
    { name: "Important Viva Questions", stars: 92 },
    { name: "Discrete Mathematics PDF", stars: 111 },
    { name: "Compiler Design eBook", stars: 83 },
    { name: "ML Handwritten Guide", stars: 120 },
    { name: "Resume Templates", stars: 57 },
    { name: "HR Interview Q&A", stars: 74 },
    { name: "Company-wise Coding Sheets", stars: 166 },
  ];

  return (
    <>
    {loading && <Loading />}
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-3xl rounded-xl bg-white/70 p-4 sm:p-6">
        <div className="space-y-2">
          {resources.map((item) => (
            <div
              key={item.name}
              className="flex items-start justify-between gap-2 rounded-md border border-gray-100 bg-[#fffaf5] px-2 py-2 sm:px-3"
            >
              <a
                href="#"
                className="min-w-0 flex-1 wrap-break-words text-xs text-gray-800 underline-offset-2 hover:underline sm:text-sm"
              >
                {item.name}
              </a>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-yellow-300 bg-yellow-50 px-1.5 py-1 text-yellow-600 transition hover:bg-yellow-100"
                  aria-label={`Star ${item.name}`}
                >
                  <Star className="h-4 w-4" />
                  <span className="text-[11px] font-medium text-gray-700 sm:text-xs">{item.stars}</span>
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-red-600 sm:text-xs"
                >
                  Delete
                </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default MyContribution;
