import React from "react";

function Sem() {
  const options = [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
  ]

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-xl rounded-xl bg-white/70 p-4 sm:p-6">
        <div>
          {options.map((option, index) => (
            <div key={`${option}-${index}`}>
              <p className="py-3 text-sm sm:text-base text-gray-800 cursor-pointer">
                {option}
              </p>
              {index !== options.length - 1 && <div className="h-px w-full bg-red-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sem;
