import express from "express";
import DBConnect from "./utils/DBConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import LoginRoute from "./routes/login.route.js";
import setDataRoute from "./routes/setData.route.js";
import getDataRoute from "./routes/getData.route.js";

dotenv.config();
DBConnect();
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/login", LoginRoute);
app.use("/api/v1/set-data", setDataRoute);
app.use("/api/v1/get-data", getDataRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
