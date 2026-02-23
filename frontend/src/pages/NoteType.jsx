import React from "react";

function NoteType() {
  const [selectedYear, setSelectedYear] = React.useState("1st Year");
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const options = [
    "Class Notes",
    "Handwritten Notes",
    "Typed Notes",
    "Short Notes",
    "Detailed Notes",
    "Previous Year Papers",
    "Assignments",
    "Lab Manuals",
    "Important Questions",
    "Exam Strategy",
    "Reference Material",
    "Cheat Sheets",
    "Class Notes",
    "Handwritten Notes",
    "Typed Notes",
    "Short Notes",
    "Detailed Notes",
    "Previous Year Papers",
    "Assignments",
    "Lab Manuals",
    "Important Questions",
    "Exam Strategy",
    "Reference Material",
    "Cheat Sheets",
  ];

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-xl rounded-xl bg-white/70 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="year-selector" className="text-xs font-medium text-gray-700">
            Year
          </label>
          <select
            id="year-selector"
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            className="rounded-md border border-red-300 bg-white px-2 py-1 text-xs text-gray-800 outline-none focus:border-red-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
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

export default NoteType;
