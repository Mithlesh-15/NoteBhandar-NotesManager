import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import api from "../utils/api";

function MyContribution() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getMyContributions = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/v1/profile/my-contribution");
        const data = Array.isArray(response?.data?.resources)
          ? response.data.resources
          : [];
        setResources(data);
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate("/login", { replace: true });
          return;
        }
        console.error("Error fetching contributions:", error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    getMyContributions();
  }, [navigate]);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
        <div className="mx-auto w-full max-w-3xl rounded-xl bg-white/70 p-4 sm:p-6">
          <div className="space-y-2">
            {resources.map((item) => (
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
                  {item.title}
                </a>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md border border-yellow-300 bg-yellow-50 px-1.5 py-1 text-yellow-600 transition hover:bg-yellow-100"
                    aria-label={`Star ${item.title}`}
                  >
                    <Star className="h-4 w-4" />
                    <span className="text-[11px] font-medium text-gray-700 sm:text-xs">
                      {item.star}
                    </span>
                  </button>
                </div>
              </div>
            ))}
            {!loading && resources.length === 0 && (
              <p className="rounded-md bg-white px-3 py-2 text-sm text-gray-600">
                No contributions found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyContribution;
