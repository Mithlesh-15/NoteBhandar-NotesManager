import express from "express";
import isAuthorized from "../utils/isAuthorized.js";
import { getProfileDetails } from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/details", isAuthorized, getProfileDetails);

export default router;
