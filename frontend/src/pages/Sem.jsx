import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

function Sem() {
  const navigate = useNavigate();
  const { college, course, subject } = useParams();
  const [loading, setLoading] = useState(false);
  const [semesterOptions, setSemesterOptions] = useState([]);

  const handleClick = (e) => {
    navigate(`/find/${college}/${course}/${subject}/${e.id}`);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const response = await api.post("/api/v1/get-data/semester-options", {
          subjectId: subject,
        });

        const semester = Array.isArray(response?.data?.semesters)
          ? response.data.semesters
          : [];

        setSemesterOptions(semester);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [navigate]);

  // Adsterra ads
  useEffect(() => {
    const container = document.getElementById(
      "container-de7ee0142ad9474f40f494f10542fe0a",
    );

    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://pl28998539.profitablecpmratenetwork.com/de7ee0142ad9474f40f494f10542fe0a/invoke.js";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
        <p className="mb-4 text-center text-sm sm:text-base text-gray-500">
          choose your semester or year
        </p>
        <div className="mx-auto w-full max-w-xl rounded-xl bg-white/70 p-4 sm:p-6">
          <div>
            {semesterOptions.map((option, index) => (
              <div
                key={`${option}-${index}`}
                onClick={() => handleClick(option)}
              >
                <p className="py-3 text-sm sm:text-base text-gray-800 cursor-pointer">
                  {option.name}
                </p>
                {index !== semesterOptions.length - 1 && (
                  <div className="h-px w-full bg-red-500" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4">
            <div className="w-[320px] max-w-full overflow-hidden">
              <div id="container-de7ee0142ad9474f40f494f10542fe0a"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sem;
