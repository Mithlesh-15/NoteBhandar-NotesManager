import express from "express";
import {
  createCollegeCourseSubject,
  createSemester,
} from "../controllers/setData.controller.js";

const router = express.Router();

router.post("/base", createCollegeCourseSubject);
router.post("/info", createSemester);

export default router;
