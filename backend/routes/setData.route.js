import express from "express";
import {
  createCollegeCourseSubject,
  createResourse,
  createSemester,
} from "../controllers/setData.controller.js";
import isAuthorized from "../utils/isAuthorized.js";

const router = express.Router();

router.post("/base", createCollegeCourseSubject);
router.post("/info", createSemester);
router.post("/resourse", isAuthorized,createResourse);

export default router;
