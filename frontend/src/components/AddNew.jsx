import React from "react";
import { Plus } from "lucide-react";

function AddNew() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-150 hover:bg-purple-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-[#f6e7d8]"
      >
        <Plus size={18} />
        <span>Add New</span>
      </button>
    </div>
  );
}

export default AddNew;
