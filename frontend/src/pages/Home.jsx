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

  const resources = [
    {
      id: 1,
      name: "4th I.T. Complete Prectical",
      link: "https://drive.google.com/file/d/1U-q_WAG0AhcP7x8zelp_ZQKgM9Hul5Xb/view?usp=sharing",
    },
    {
      id: 2,
      name: "4th I.T. Almost Complete Prectical",
      link: "https://drive.google.com/file/d/1GB00S7KxO0NdbHLhnylqC2QAdKlqdj-N/view",
    },
    {
      id: 3,
      name: "4th Maths IMP for 2nd internal",
      link: "https://drive.google.com/file/d/153KNNWcIqU7G_Mf4-vVFjDTnTyeYgB-W/view",
    },
  ];
  useEffect(() => {
    const fetch = async () => {
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
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [navigate]);

  return (
    <>
      {" "}
      {loading && <Loading />}
      <div className="min-h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] mt-10 px-4 pb-32 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
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
            className="mt-3 w-full rounded-2xl bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-md cursor-pointer transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#f6e7d8]"
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

        {/* demo content */}
        <div className="space-y-2">
          {resources.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-start justify-between gap-2 rounded-md border border-gray-100 bg-[#fffaf5] px-2 py-2 sm:px-3"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 flex-1 wrap-break-words text-xs text-gray-800 underline-offset-2 hover:underline sm:text-sm"
                >
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            NoteBhandar - Your Study Resource Hub
          </h1>

          {/* Intro */}
          <p className="text-gray-600 leading-relaxed mb-6">
            NoteBhandar is a platform where students can find notes, previous
            year questions (PYQs), assignments, and study materials in one
            place. Instead of searching across multiple platforms, everything is
            organized based on your college, course, and subject.
          </p>

          {/* Why Use */}
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Why Use NoteBhandar?
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>All study materials in one place</li>
            <li>Easy filtering by college, course, and subject</li>
            <li>Completely free access to resources</li>
            <li>Students can upload and share useful notes</li>
          </ul>

          {/* How It Works */}
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            How It Works
          </h2>

          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>Select your college</li>
            <li>Choose your course and subject</li>
            <li>Access notes and study materials instantly</li>
          </ol>

          {/* Featured Resources */}
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Featured Resources
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "DBMS Notes – Unit 1",
              "Physics Previous Year Questions (2023)",
              "Mathematics Important Questions",
              "Computer Networks Assignment",
              "Operating System Notes",
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-sm text-gray-500 leading-relaxed">
            Note: NoteBhandar does not host any files. All resources are
            user-submitted links. If you find any copyrighted material, please
            contact us for removal.
          </p>
        </div>
    </>
  );
}

export default Home;
