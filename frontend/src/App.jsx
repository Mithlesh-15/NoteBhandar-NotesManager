import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AddNew from "./components/AddNew";
import Loading from "./components/Loading";
import NoteType from "./pages/NoteType";
import Sem from "./pages/Sem";


function App() {
  return (
    <>
      <div className="relative w-screen h-screen bg-[#f6e7d8] overflow-y-hidden">
        <NavBar />
        {/* <Home /> */}
        {/* <Loading /> */}
        {/* <Sem /> */}
        <NoteType />
        <AddNew />
      </div>
    </>
  );
}

export default App;
