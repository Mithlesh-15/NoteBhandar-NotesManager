import React from "react";
import { Plus } from "lucide-react";

function AddNew() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
      <button
        type="button"
        className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        <span>Add New</span>
      </button>
    </div>
  );
}

export default AddNew;
