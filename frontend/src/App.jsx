import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import AddNew from "./components/AddNew";

function App() {
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
