import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

function NoteType() {
  const navigate = useNavigate();
  const { college, course, subject, sem } = useParams();
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) =>
    String(currentYear - index),
  );
  const [options, setOptions] = useState([]);

  const handleClick = (e) => {
    navigate(
      `/find/${college}/${course}/${subject}/${sem}/${selectedYear}/${e.id}`,
    );
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);

        const response = await api.post("/api/v1/get-data/notetype", {
          semesterId: sem,
          year: selectedYear,
        });

        const types = Array.isArray(response?.data?.noteTypes)
          ? response.data.noteTypes
          : [];
        setOptions(types);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [navigate, selectedYear]);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
        <div className="mx-auto w-full max-w-xl rounded-xl bg-white/70 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <label
              htmlFor="year-selector"
              className="text-xs font-medium text-gray-700"
            >
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
              <div key={option.id} onClick={() => handleClick(option)}>
                <p className="py-3 text-sm sm:text-base text-gray-800 cursor-pointer">
                  {option.name}
                </p>
                {index !== options.length - 1 && (
                  <div className="h-px w-full bg-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteType;
