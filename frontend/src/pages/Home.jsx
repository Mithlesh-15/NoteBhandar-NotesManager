import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    college: [],
    course: [],
    subject: [],
    selectedCollege: "",
    selectedCourse: "",
    selectedSubject: "",
  });
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);

        const response = await api.get("/api/v1/get-data/college");

        const colleges = Array.isArray(response?.data?.colleges)
          ? response.data.colleges
          : [];

        setData((prev) => ({
          ...prev,
          college: colleges,
        }));
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
      {" "}
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-hidden bg-[#f6e7d8] px-4 pb-24 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
        <div className="w-full max-w-md">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Select College
          </p>
          <select
            className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
            defaultValue="personal"
            value={data.selectedCollege}
            onChange={async (e) => {
              setData((prev) => ({
                ...prev,
                selectedCollege: e.target.value,
              }));
              if (e.target.value === "select") return;
              try {
                setLoading(true);
                const response = await api.post("/api/v1/get-data/course", {
                  collegeId: e.target.value,
                });

                const courses = Array.isArray(response?.data?.courses)
                  ? response.data.courses
                  : [];

                setData((prev) => ({
                  ...prev,
                  course: courses,
                }));
              } catch (error) {
                console.error("Error fetching courses:", error);
                navigate("/login", { replace: true });
              } finally {
                setLoading(false);
              }
            }}
          >
            <option value="select">Select</option>
            {data.college.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full max-w-md">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Select Course
          </p>
          <select
            className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
            defaultValue="personal"
            value={data.selectedCourse}
            onChange={async (e) => {
              setData((prev) => ({
                ...prev,
                selectedCourse: e.target.value,
              }));
              if (e.target.value === "select") return;
              try {
                setLoading(true);
                const response = await api.post("/api/v1/get-data/subject", {
                  courseId: e.target.value,
                });

                const subjects = Array.isArray(response?.data?.subjects)
                  ? response.data.subjects
                  : [];

                setData((prev) => ({
                  ...prev,
                  subject: subjects,
                }));
              } catch (error) {
                console.error("Error fetching subjects:", error);
                navigate("/login", { replace: true });
              } finally {
                setLoading(false);
              }
            }}
          >
            <option value="select">Select</option>
            {data.course.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full max-w-md">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Select Subject
          </p>
          <select
            className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-purple-400"
            defaultValue="personal"
            value={data.selectedSubject}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                selectedSubject: e.target.value,
              }));
              if (e.target.value === "select") return;
            }}
          >
            <option value="select">Select</option>
            {data.subject.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* fetch button */}

        <div className="w-full max-w-md flex justify-center">
          <button
            type="button"
            className="mt-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md cursor-pointer transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#f6e7d8]"
            onClick={() => {
              if (
                data.selectedCollege === "select" ||
                data.selectedCourse === "select" ||
                data.selectedSubject === "select"
              ) {
                return;
              } else
                navigate(
                  `/find/${data.selectedCollege}/${data.selectedCourse}/${data.selectedSubject}`,
                );
            }}
          >
            Find
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
