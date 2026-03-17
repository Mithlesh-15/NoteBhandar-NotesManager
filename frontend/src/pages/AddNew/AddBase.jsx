import { ArrowBigRightDash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import api from "../../utils/api";

const selectorClass =
  "w-full rounded-2xl border border-[#c9b6e4] bg-white/95 px-4 py-3 text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300";

const inputClass =
  "mt-3 w-full rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200";

function AddBase() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [baseData, setBaseData] = useState({
    college: [],
    course: [],
    subject: [],
    collegeNew: "",
    courseNew: "",
    subjectNew: "",
  });
  const [newData, setNewData] = useState(false);

  const handleNext = async () => {
    try {
      setLoading(true);
      const response = await api.post("/api/v1/set-data/base", {
        collegeName: college === "add_new" ? baseData.collegeNew : college,
        courseName: course === "add_new" ? baseData.courseNew : course,
        subjectName: subject === "add_new" ? baseData.subjectNew : subject,
      });

      if (!response?.data?.success) {
        alert(response?.data?.message || "Failed to create data");
        return;
      }

      const { collegeId, courseId, subjectId } = response.data.ids || {};

      if (!collegeId || !courseId || !subjectId) {
        alert("Invalid response from server");
        return;
      }

      navigate(`/add-new/${collegeId}/${courseId}/${subjectId}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to create data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const response = await api.get("/api/v1/get-data/college", {
          withCredentials: true,
        });

        if (!response?.data?.isLoggedIn) {
          navigate("/login", { replace: true });
          return;
        }

        const colleges = Array.isArray(response?.data?.colleges)
          ? response.data.colleges
          : [];

        setBaseData((prev) => ({
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

    fetch();
  }, [navigate]);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-linear-to-b from-[#fff6e9] via-[#ffe9d2] to-[#f9ddbf] px-3 pb-36 pt-5 sm:px-4 sm:pt-8">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-3xl border border-[#f1cfa6] bg-[#fff9f2]/90 p-4 shadow-[0_16px_40px_rgba(94,53,177,0.12)] sm:gap-5 sm:p-6">
          <h2 className="text-lg font-bold text-[#5d3f88] sm:text-xl">
            Add Your New Notes
          </h2>
          <p className="text-sm leading-6 text-[#7a6b61]">
            Choose the details below. If your option is missing, select Add New
            and type it.
          </p>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">
              Select College
            </p>
            <select
              className={selectorClass}
              value={college}
              onChange={async (e) => {
                setCollege(e.target.value);
                if (e.target.value === "select") return;
                if (e.target.value === "add_new") {
                  setNewData(true);
                  return;
                }
                try {
                  setLoading(true);
                  setNewData(false);
                  const response = await api.post("/api/v1/get-data/course", {
                    collegeId: e.target.value,
                  });

                  const courses = Array.isArray(response?.data?.courses)
                    ? response.data.courses
                    : [];

                  setBaseData((prev) => ({
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
              <option value="add_new">Add New</option>
              {baseData.college.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            {college === "add_new" && (
              <input
                type="text"
                value={baseData.collegeNew || ""}
                className={inputClass}
                placeholder="Enter new college name"
                onChange={(e) => {
                  setBaseData((prev) => ({
                    ...prev,
                    collegeNew: e.target.value,
                  }));
                }}
              />
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">
              Select Course
            </p>
            <select
              className={selectorClass}
              value={course}
              onChange={async (e) => {
                setCourse(e.target.value);
                if (e.target.value === "select") return;
                if (e.target.value === "add_new") {
                  setNewData(true);
                  return;
                }
                try {
                  setLoading(true);
                  setNewData(false);
                  const response = await api.post("/api/v1/get-data/subject", {
                    courseId: e.target.value,
                  });

                  const subjects = Array.isArray(response?.data?.subjects)
                    ? response.data.subjects
                    : [];

                  setBaseData((prev) => ({
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
              <option value="add_new">Add New</option>
              {baseData.course.map((col, idx) => (
                <option key={idx} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            {course === "add_new" && (
              <input
                type="text"
                value={baseData.courseNew}
                className={inputClass}
                placeholder="Enter new course name"
                onChange={(e) => {
                  setBaseData((prev) => ({
                    ...prev,
                    courseNew: e.target.value,
                  }));
                }}
              />
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">
              Select Subject
            </p>
            <select
              className={selectorClass}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (e.target.value === "select") return;
                if (e.target.value === "add_new") {
                  setNewData(true);
                  return;
                }
                setNewData(false);
              }}
            >
              <option value="select">Select</option>
              <option value="add_new">Add New</option>
              {baseData.subject.map((col, idx) => (
                <option key={idx} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            {subject === "add_new" && (
              <input
                type="text"
                value={baseData.subjectNew}
                className={inputClass}
                placeholder="Enter new subject name"
                onChange={(e) => {
                  setBaseData((prev) => ({
                    ...prev,
                    subjectNew: e.target.value,
                  }));
                }}
              />
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
          <button
            type="button"
            className="mx-auto flex w-full max-w-xl cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-purple-600 bg-[#f6d7b8] px-6 py-3 font-semibold text-black shadow-md transition-all duration-150 hover:bg-[#f3cca2] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-[#f9e4cb]"
            onClick={() => {
              if (newData) handleNext();
              else if (
                college === "select" ||
                course === "select" ||
                subject === "select"
              ) {
                return;
              } else navigate(`/add-new/${college}/${course}/${subject}`);
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

export default AddBase;
