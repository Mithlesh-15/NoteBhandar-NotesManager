import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading.jsx"
import Ads from "../components/Ads.jsx";

const STARRED_RESOURCE_KEY = "starredResourseIds";

const getStoredStarredIds = () => {
  try {
    const raw = localStorage.getItem(STARRED_RESOURCE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed);
  } catch (_error) {
    return new Set();
  }
};

const saveStarredIds = (idsSet) => {
  try {
    localStorage.setItem(
      STARRED_RESOURCE_KEY,
      JSON.stringify(Array.from(idsSet)),
    );
  } catch (_error) {
    // Ignore storage errors to avoid breaking UI flow.
  }
};

function Resource() {
  const navigate = useNavigate();
  const { noteType } = useParams();
  const [loading, setLoading] = useState(false)
  const [resources, setResources] = useState([]);
  const [starredIds, setStarredIds] = useState(() => getStoredStarredIds());
  const [updatingIds, setUpdatingIds] = useState(new Set());

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const response = await api.post("/api/v1/get-data/resourse", {
          noteTypeId: noteType,
        });

        const data = Array.isArray(response?.data?.resourses)
          ? response.data.resourses
          : [];
        setResources(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [navigate, noteType]);

  const handleStarToggle = async (resourseId) => {
    const isStarred = starredIds.has(resourseId);
    const actionQuery = isStarred ? "decrease" : "increase";

    setUpdatingIds((prev) => {
      const next = new Set(prev);
      next.add(resourseId);
      return next;
    });

    try {
      const response = await api.put(
        `/api/v1/action/update-star?query=${actionQuery}`,
        {
          resourseId,
        },
      );

      const updatedStar = response?.data?.resource?.star;

      setResources((prev) =>
        prev.map((item) => {
          if (item.id !== resourseId) return item;
          return {
            ...item,
            star:
              typeof updatedStar === "number"
                ? updatedStar
                : Math.max(0, (item.star ?? 0) + (isStarred ? -1 : 1)),
          };
        }),
      );

      setStarredIds((prev) => {
        const next = new Set(prev);
        if (isStarred) {
          next.delete(resourseId);
        } else {
          next.add(resourseId);
        }
        saveStarredIds(next);
        return next;
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      console.error("Error updating star:", error);
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(resourseId);
        return next;
      });
    }
  };

  return (
    <>
    {loading && <Loading />}
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
      <div className="mx-auto w-full max-w-3xl rounded-xl bg-white/70 p-4 sm:p-6">
        <div className="space-y-2">
          {resources.map((item) => {
            const isStarred = starredIds.has(item.id);
            const isUpdating = updatingIds.has(item.id);

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
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStarToggle(item.id)}
                    disabled={isUpdating}
                    className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-1 transition ${
                      isStarred
                        ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                        : "border-yellow-300 bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                    } ${isUpdating ? "cursor-not-allowed opacity-60" : ""}`}
                    aria-label={`${isStarred ? "Unstar" : "Star"} ${item.name}`}
                  >
                    <Star
                      className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`}
                    />
                    <span className="text-[11px] font-medium text-gray-700 sm:text-xs">
                      {item.star}
                    </span>
                  </button>
                  <button
                  onClick={()=>(navigate(`/fr/${item.id}`))}
                    type="button"
                    className="rounded-md bg-red-500 px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-red-600 sm:text-xs"
                  >
                    Report
                  </button>
                </div>
              </div>
            );
          })}
          {resources.length > 0 && <Ads />}
        </div>
      </div>
      <Ads />
    </div>
    </>
  );
}

export default Resource;
