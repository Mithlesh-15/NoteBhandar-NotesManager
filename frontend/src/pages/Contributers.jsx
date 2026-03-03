import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import api from "../utils/api";
import Loading from "../components/Loading";

function Contributers() {
  const [loading, setLoading] = useState(false);
  const [contributers, setContributers] = useState([]);

  const getAllContributers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/v1/profile/contributers");
      console.log(response)
      const users = Array.isArray(response?.data?.users) ? response.data.users : [];
      setContributers(users);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      setContributers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllContributers();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-[#f6e7d8] px-4 py-6 pb-28">
        <div className="mx-auto w-full max-w-2xl rounded-xl bg-white/70 p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-purple-900 sm:text-xl">Our Contributors</h2>

          <div className="space-y-2">
            {contributers.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-[#fffaf5] px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-purple-200 bg-purple-100">
                    <img
                      src={person.profilePhoto}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="truncate text-sm font-medium text-gray-800 sm:text-base">{person.name}</p>
                </div>

                <div className="inline-flex shrink-0 items-center gap-1 rounded-md border border-yellow-300 bg-yellow-50 px-2 py-1 text-yellow-600">
                  <Star className="h-4 w-4" />
                  <span className="text-xs font-semibold text-gray-700">{person.stars}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contributers;
