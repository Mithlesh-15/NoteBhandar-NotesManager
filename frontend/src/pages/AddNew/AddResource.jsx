import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../../components/Loading";

const selectorClass =
  "w-full rounded-2xl border border-[#c9b6e4] bg-white/95 px-4 py-3 text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300";

const inputClass =
  "w-full rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200";

const cloudLinks = [
  {
    label: "Google Drive",
    href: "https://support.google.com/drive/answer/2494822?hl=en",
  },
];

function AddResource() {
  const navigate = useNavigate();
  const { sem, year } = useParams();
  const [loading, setLoading] = useState(false);
  const [noteType, setNoteType] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [selectedData, setSelectedData] = useState({
    noteType: "",
    newNoteType: "",
    title: "",
    link: "",
  });

  const openHelpModal = () => {
    setShowHelp(true);
    setTimeout(() => setIsPopupActive(true), 10);
  };

  const closeHelpModal = () => {
    setIsPopupActive(false);
    setTimeout(() => setShowHelp(false), 180);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/v1/set-data/resourse", {
        semesterId: sem,
        noteType: selectedData.noteType === "add_new" ? selectedData.newNoteType : selectedData.noteType,
        noteYear: year,
        resourseTitle: selectedData.title,
        link: selectedData.link,
      });

      if (response.data.success) {
        navigate("/find");
      } else {
        console.error("Failed to upload resource:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading resource:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const response = await api.post("/api/v1/get-data/notetype", {
          semesterId: sem,
          year: year,
        });

        const types = Array.isArray(response?.data?.noteTypes)
          ? response.data.noteTypes
          : [];

        setNoteType(types);
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
            Add Resource
          </h2>
          <p className="text-sm leading-6 text-[#7a6b61]">
            Fill the details below and paste the shareable link.
          </p>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">
              Note Type
            </p>
            <select
              className={selectorClass}
              value={selectedData.noteType}
              onChange={(e) =>
                setSelectedData({ ...selectedData, noteType: e.target.value })
              }
            >
              <option value="select">Select</option>
              <option value="add_new">Add New</option>
              {noteType.map((col) => (
                <option key={col.id} value={col.name}>
                  {col.name}
                </option>
              ))}
            </select>
            {selectedData.noteType === "add_new" && (
              <input
                type="text"
                className="mt-3 w-full rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                placeholder="Enter note type"
                value={selectedData.newNoteType}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    newNoteType: e.target.value,
                  })
                }
              />
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">Title</p>
            <input
              type="text"
              className={inputClass}
              placeholder="Enter title"
              value={selectedData.title}
              onChange={(e) =>
                setSelectedData({ ...selectedData, title: e.target.value })
              }
            />
          </div>

          <div>
            <button
              type="button"
              onClick={openHelpModal}
              className="mb-2 cursor-pointer text-sm font-semibold text-purple-700 underline underline-offset-4"
            >
              How to add link?
            </button>
            <p className="mb-2 text-sm font-semibold text-[#6b4f91]">
              Resource Link
            </p>
            <input
              type="text"
              className={inputClass}
              placeholder="Paste shareable link here"
              value={selectedData.link}
              onChange={(e) =>
                setSelectedData({ ...selectedData, link: e.target.value })
              }
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
          <button
            type="button"
            className="mx-auto flex w-full max-w-xl cursor-pointer items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-150 hover:bg-purple-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-[#f9e4cb]"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>

        {showHelp && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 transition-opacity duration-200 ${isPopupActive ? "opacity-100" : "opacity-0"}`}
            onClick={closeHelpModal}
          >
            <div
              className={`w-full max-w-md rounded-2xl bg-white p-5 shadow-xl transition-all duration-200 ${isPopupActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-[#5d3f88]">
                  Link Sources
                </h3>
                <button
                  type="button"
                  onClick={closeHelpModal}
                  className="cursor-pointer rounded-md px-2 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Click on the platform where you want to upload file.
              </p>
              <div className="flex flex-col gap-2">
                {cloudLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-purple-200 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddResource;
