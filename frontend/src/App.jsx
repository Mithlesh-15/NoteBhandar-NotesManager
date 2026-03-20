import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import AddNew from "./components/AddNew";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="relative flex min-h-screen w-screen flex-col bg-[#f6e7d8]">
        <NavBar />
        <div className="flex-1 overflow-y-auto pb-6">
          <Outlet />
        </div>
        <Footer />
        <AddNew />
      </div>
    </>
  );
}

export default App;
