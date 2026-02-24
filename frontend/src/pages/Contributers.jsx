import React from "react";
import { Star } from "lucide-react";

function Contributers() {
  const contributers = [
    { name: "Aman Verma", stars: 128, avatar: "https://i.pravatar.cc/100?img=12" },
    { name: "Priya Singh", stars: 203, avatar: "https://i.pravatar.cc/100?img=47" },
    { name: "Ravi Kumar", stars: 97, avatar: "https://i.pravatar.cc/100?img=52" },
    { name: "Sneha Yadav", stars: 164, avatar: "https://i.pravatar.cc/100?img=32" },
    { name: "Harshit Raj", stars: 119, avatar: "https://i.pravatar.cc/100?img=15" },
    { name: "Neha Sharma", stars: 186, avatar: "https://i.pravatar.cc/100?img=5" },
    { name: "Karan Patel", stars: 75, avatar: "https://i.pravatar.cc/100?img=66" },
    { name: "Anjali Gupta", stars: 142, avatar: "https://i.pravatar.cc/100?img=20" },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white/70 p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-purple-900 sm:text-xl">Our Contributors</h2>

        <div className="space-y-2">
          {contributers.map((person) => (
            <div
              key={person.name}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-[#fffaf5] px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-purple-200 bg-purple-100">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="truncate text-sm font-medium text-gray-800 sm:text-base">{person.name}</p>
              </div>

              <div className="inline-flex shrink-0 items-center gap-1 rounded-md border border-yellow-300 bg-yellow-50 px-2 py-1 text-yellow-600">
                <Star className="h-4 w-4" />
                <span className="text-xs font-semibold text-gray-700">{person.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contributers;
