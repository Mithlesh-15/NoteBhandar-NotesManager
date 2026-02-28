import express from "express";
import isAuthorized from "../utils/isAuthorized.js";
import {
  getColleges,
  getCourses,
  getSemester,
  getSubjects,
} from "../controllers/getData.controller.js";

const router = express.Router();

router.get("/college", isAuthorized, getColleges);
router.post("/course", getCourses);
router.post("/subject", getSubjects);
router.post("/semester-options", getSemester);

export default router;
