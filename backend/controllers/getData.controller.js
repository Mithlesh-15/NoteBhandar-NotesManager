import jwt from "jsonwebtoken";
import College from "../models/college.model.js";
import Course from "../models/course.model.js";
import Subject from "../models/subject.model.js";

export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find({})
      .select("_id collegeName")
      .sort({ collegeName: 1 })
      .lean();

    const collegeList = colleges.map((college) => ({
      id: college._id,
      name: college.collegeName,
    }));

    let isLoggedIn = false;
    const token = req.cookies?.token;
    const jwtSecret = process.env.JWT_SECRET;

    if (token && jwtSecret) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        isLoggedIn = Boolean(decoded?.userId);
      } catch (_error) {
        isLoggedIn = false;
      }
    }

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

export const getCourses = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: "collegeId is required",
      });
    }

    const courses = await Course.find({ collegeId })
      .select("_id courseName")
      .sort({ courseName: 1 })
      .lean();

    const courseList = courses.map((course) => ({
      id: course._id,
      name: course.courseName,
    }));
    return res.status(200).json({
      success: true,
      courses: courseList,
    });
  } catch (error) {
    console.error("getCoursesByCollege error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching courses",
    });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    const subjects = await Subject.find({ courseId })
      .select("_id subjectName")
      .sort({ subjectName: 1 })
      .lean();

    const subjectList = subjects.map((subject) => ({
      id: subject._id,
      name: subject.subjectName,
    }));

    return res.status(200).json({
      success: true,
      subjects: subjectList,
    });
  } catch (error) {
    console.error("getSubjectsByCourse error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching subjects",
    });
  }
};
