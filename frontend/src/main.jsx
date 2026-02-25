import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Sem from "./pages/Sem";
import NoteType from "./pages/NoteType";
import Resource from "./pages/Resource";
import Login from "./pages/Login";
import AddOutlet from "./pages/AddNew/AddOutlet";
import AddBase from "./pages/AddNew/AddBase";
import AddInfo from "./pages/AddNew/AddInfo";
import AddResource from "./pages/AddNew/AddResource";
import MyProfile from "./pages/MyProfile";
import MyContribution from "./pages/MyContribution";
import FandR from "./pages/FandR";
import Contributers from "./pages/Contributers";
import NavBar from "./components/NavBar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/find" element={<App />}>
        <Route index element={<Home />} />
        <Route path=":college/:course/:subject" element={<Sem />} />
        <Route path=":college/:course/:subject/:sem" element={<NoteType />} />
        <Route
          path=":college/:course/:subject/:sem/:year/:noteType"
          element={<Resource />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/add-new" element={<AddOutlet />}>
        <Route index element={<AddBase />} />
        <Route path=":college/:course/:subject" element={<AddInfo />} />
        <Route
          path=":college/:course/:subject/:sem/:year"
          element={<AddResource />}
        />
      </Route>
      <Route
        path="/profile/:id"
        element={
          <>
            <NavBar />
            <MyProfile />
          </>
        }
      />
      <Route
        path="/contributions/:id"
        element={
          <>
            <NavBar />
            <MyContribution />
          </>
        }
      />
      <Route
        path="/fr"
        element={
          <>
            <NavBar />
            <FandR />
          </>
        }
      />
      <Route
        path="/our-contributers"
        element={
          <>
            <NavBar />
            <Contributers />
          </>
        }
      />
      <Route
        path="*"
        element={
          <h1 className="text-center text-2xl font-bold">404 Not Found</h1>
        }
      />
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
