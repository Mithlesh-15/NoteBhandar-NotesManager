import express from "express";
import DBConnect from "./utils/DBConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import LoginRoute from "./routes/login.route.js";
import setDataRoute from "./routes/setData.route.js";
import getDataRoute from "./routes/getData.route.js";
import profileRoute from "./routes/profile.route.js";
import actionRoute from "./routes/action.route.js";

dotenv.config();
DBConnect();
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "https://notebhandar.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/login", LoginRoute);
app.use("/api/v1/set-data", setDataRoute);
app.use("/api/v1/get-data", getDataRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/action", actionRoute);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
