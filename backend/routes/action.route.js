import express from "express";
import {
  deleteResourseWithCascade,
  feedBackAndReport,
  updateStar,
} from "../controllers/action.controller.js";

const router = express.Router();

router.put("/update-star", updateStar);
router.post("/fr", feedBackAndReport);
router.delete("/delete-resourse/:resourseId", deleteResourseWithCascade);

export default router;
