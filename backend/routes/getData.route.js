import express from "express";
import isAuthorized from "../utils/isAuthorized.js";
import {
  getColleges,
  getCourses,
  getSubjects,
} from "../controllers/getData.controller.js";

const router = express.Router();

router.get("/college", isAuthorized, getColleges);
router.post("/course", isAuthorized, getCourses);
router.post("/subject", isAuthorized, getSubjects);

export default router;
