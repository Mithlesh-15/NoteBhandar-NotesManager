import jwt from "jsonwebtoken";
import College from "../models/college.model.js";

export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find({})
      .select("_id collegeName")
      .sort({ collegeName: 1 })
      .lean();

    const collegeList = colleges.map((college) => ({
      id: college._id,
      name: college.collegeName,
    }));

    let isLoggedIn = req.userId ? true : false;

    return res.status(200).json({
      success: true,
      isLoggedIn,
      colleges: collegeList,
    });
  } catch (error) {
    console.error("getAllColleges error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching colleges",
    });
  }
};
