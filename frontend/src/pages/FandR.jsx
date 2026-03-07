import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

function FandR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedName = formData.name.trim();
    const normalizedSubject = formData.subject.trim();
    const normalizedMessage = formData.message.trim();

    if (!id || !normalizedName || !normalizedSubject || !normalizedMessage) {
      alert("id, name, subject and message are required");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/v1/action/fr", {
        id,
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
      });

      if (response?.data?.success) {
        navigate("/");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to send mail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
        <div className="mx-auto w-full max-w-xl rounded-xl border border-purple-100 bg-white/80 p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-purple-900 sm:text-xl">Feedback</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-purple-700">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-purple-700">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-purple-700">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your feedback or request..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full resize-none rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FandR;
