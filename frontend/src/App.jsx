import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AddNew from "./components/AddNew";
import Loading from "./components/Loading";
import NoteType from "./pages/NoteType";
import Sem from "./pages/Sem";
import Resource from "./pages/Resource";
import Login from "./pages/Login";
import MyContribution from "./pages/MyContribution";
import FandR from "./pages/FandR";
import MyProfile from "./pages/MyProfile";
import Contributers from "./pages/Contributers";


function App() {
  return (
    <>
      <div className="relative w-screen h-screen bg-[#f6e7d8] overflow-y-hidden">
        <NavBar />
        {/* <Home /> */}
        {/* <Loading /> */}
        {/* <Sem /> */}
        {/* <NoteType /> */}
        {/* <Resource /> */}
        {/* <MyContribution /> */}
        {/* <FandR /> */}
        {/* <MyProfile /> */}
        <Contributers />
        <AddNew />
      </div>
    </>
    // <>
    // <Login />
    // </>
  );
}

export default App;
