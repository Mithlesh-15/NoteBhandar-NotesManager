import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import AddNew from "./components/AddNew";

function App() {

const location = useLocation();

useEffect(() => {
  // home page skip
  if (location.pathname === "/find") return;

  // पहले check कर कि script already है या नहीं
  if (document.getElementById("monetag-script")) return;

  const script = document.createElement("script");
  script.id = "monetag-script";
  script.src = "https://nap5k.com/tag.min.js";
  script.dataset.zone = "10797611";
  script.async = true;

  document.body.appendChild(script);

}, [location.pathname]);
  return (
    <>
      <div className="relative w-screen h-screen bg-[#f6e7d8] overflow-y-auto">
        <NavBar />
        <Outlet />
        <AddNew />
      </div>
    </>
  );
}

export default App;
