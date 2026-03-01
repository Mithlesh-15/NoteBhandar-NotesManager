import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

function Resource() {

  const navigate = useNavigate();
  const { noteType } = useParams();
  const [resources, setResources] = useState([])

useEffect(() => {
    const fetch = async () => {
      try {
        // setLoading(true);

        const response = await api.post("/api/v1/get-data/resourse", {
          noteTypeId:noteType
        });

        const data = Array.isArray(response?.data?.resourses)
          ? response.data.resourses
          : [];
          console.log(data)
          setResources(data)
      } catch (error) {
        console.error("Error fetching colleges:", error);
        navigate("/login", { replace: true });
      } finally {
        // setLoading(false);
      }
    };

    fetch();
  }, [navigate]);

  return (
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
                className="min-w-0 flex-1 wrap-break-words text-xs text-gray-800 underline-offset-2 hover:underline sm:text-sm"
              >
                {item.name}
              </a>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-yellow-300 bg-yellow-50 px-1.5 py-1 text-yellow-600 transition hover:bg-yellow-100"
                  aria-label={`Star ${item.name}`}
                >
                  <Star className="h-4 w-4" />
                  <span className="text-[11px] font-medium text-gray-700 sm:text-xs">{item.star}</span>
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-red-600 sm:text-xs"
                >
                  Report
                </button>
                </div>
              </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Resource;
