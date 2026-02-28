import { ArrowBigRightDash } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../../components/Loading";

const selectorClass =
  "w-full rounded-2xl border border-[#c9b6e4] bg-white/95 px-4 py-3 text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300";

const inputClass =
  "mt-3 w-full rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200";

function AddInfo() {
  const navigate = useNavigate();
  const { college, course, subject } = useParams();
  const [newData, setNewData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [semOrYear, setSemOrYear] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedData, setSelectedData] = useState({
    semester: "",
    year: String(currentYear),
    newSemester: "",
  });

  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) =>
    String(currentYear - index),
  );

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);

        const response = await api.post("/api/v1/get-data/semester-options", {
          subjectId: subject,
        });

        const semester = Array.isArray(response?.data?.semesters)
          ? response.data.semesters
          : [];

        setSemOrYear(semester);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [navigate]);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-linear-to-b from-[#fff6e9] via-[#ffe9d2] to-[#f9ddbf] px-3 pb-36 pt-5 sm:px-4 sm:pt-8">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-3xl border border-[#f1cfa6] bg-[#fff9f2]/90 p-4 shadow-[0_16px_40px_rgba(94,53,177,0.12)] sm:gap-5 sm:p-6">
          <h2 className="text-lg font-bold text-[#5d3f88] sm:text-xl">
            Add Info
          </h2>
          <p className="text-sm leading-6 text-[#7a6b61]">
            Select your semester or year details to continue.
          </p>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">
              Your Semester / Year
            </p>
            <select
              className={selectorClass}
              value={selectedData.semester}
              onChange={(e) => {
                setSelectedData((prev) => ({
                  ...prev,
                  semester: e.target.value,
                }));
                if (e.target.value === "select") return;
                if (e.target.value === "add_new") {
                  setNewData(true);
                  return;
                }
              }}
            >
              <option value="select">Select</option>
              <option value="add_new">Add New</option>
              {semOrYear.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            {selectedData.semester === "add_new" && (
              <input
                type="text"
                className={inputClass}
                value={selectedData.newSemester}
                onChange={(e) => {
                  setSelectedData((prev) => ({
                    ...prev,
                    newSemester: e.target.value,
                  }));
                }}
                placeholder="Enter your semester or year"
              />
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">Year</p>
            <select
              className={selectorClass}
              value={selectedData.year}
              onChange={(e) => {
                setSelectedData((prev) => ({
                  ...prev,
                  year: e.target.value,
                }));
              }}
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
          <button
            type="button"
            className="mx-auto flex w-full max-w-xl cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-purple-600 bg-[#f6d7b8] px-6 py-3 font-semibold text-black shadow-md transition-all duration-150 hover:bg-[#f3cca2] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-[#f9e4cb]"
            onClick={async () => {
              if (newData) {
                try {
                  setLoading(true);

                  const response = await api.post("/api/v1/set-data/info", {
                    subjectId:subject,
                    semester: selectedData.newSemester,
                  });

                  if (!response?.data?.success) {
                    alert(response?.data?.message || "Failed to create data");
                    return;
                  }

                  

                  if (!response.data.semesterId) {
                    alert("Invalid response from server");
                    return;
                  }

                  navigate(
                  `/add-new/${college}/${course}/${subject}/${response.data.semesterId}/${selectedData.year}`,
                );
                } catch (error) {
                  alert(
                    error?.response?.data?.message || "Failed to create data",
                  );
                } finally {
                  setLoading(false);
                }
              } else {
                navigate(
                  `/add-new/${college}/${course}/${subject}/${selectedData.semester}/${selectedData.year}`,
                );
              }
            }}
          >
            <span className="tracking-wide">Next</span>
            <ArrowBigRightDash size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AddInfo;
