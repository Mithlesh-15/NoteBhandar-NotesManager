import express from "express";
import {
  deleteResourseWithCascade,
  updateStar,
} from "../controllers/action.controller.js";

const router = express.Router();

router.put("/update-star", updateStar);
router.delete("/delete-resourse/:resourseId", deleteResourseWithCascade);

export default router;
