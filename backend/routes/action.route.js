import express from "express";
import isAuthorized from "../utils/isAuthorized.js";
import { updateStar } from "../controllers/action.controller.js";

const router = express.Router();

router.put("/update-star", updateStar);

export default router;
