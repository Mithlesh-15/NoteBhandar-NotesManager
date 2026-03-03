import express from "express";
import isAuthorized from "../utils/isAuthorized.js";
import upload from "../middleware/upload.js";
import {
  getProfileDetails,
  updateProfileDetails,
  getAllContributers,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/details", isAuthorized, getProfileDetails);
router.get("/contributers", getAllContributers);
router.put("/update", isAuthorized, upload.single("profilePhoto"), updateProfileDetails);

export default router;
