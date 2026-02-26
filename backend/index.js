import express from "express";
import DBConnect from "./utils/DBConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import LoginRoute from "./routes/login.route.js";

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

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
