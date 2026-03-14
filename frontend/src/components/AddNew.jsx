import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        type="button"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-md transition-all duration-150 hover:bg-purple-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-[#f6e7d8]"
        onClick={()=>{
          navigate("/add-new");
        }}
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

export default AddNew;
