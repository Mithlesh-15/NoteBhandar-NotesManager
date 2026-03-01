import jwt from "jsonwebtoken";
import College from "../models/college.model.js";
import Course from "../models/course.model.js";
import Subject from "../models/subject.model.js";
import Semester from "../models/semester.model.js";
import NoteType from "../models/notetype.model.js";
import Resourse from "../models/resourse.model.js";

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

export const getSemester = async (req, res) => {
  try {
    const { subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "subjectId is required",
      });
    }

    const semesters = await Semester.find({ subjectId })
      .select("_id semester")
      .sort({ semester: 1 })
      .lean();

    const semesterList = semesters.map((semester) => ({
      id: semester._id,
      name: semester.semester,
    }));

    return res.status(200).json({
      success: true,
      semesters: semesterList,
    });
  } catch (error) {
    console.error("getSemesterBySubject error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching semesters",
    });
  }
};

export const getNotetype = async (req, res) => {
  try {
    const { semesterId, year } = req.body;

    if (!semesterId || !year) {
      return res.status(400).json({
        success: false,
        message: "semesterId and year are required",
      });
    }

    const noteTypes = await NoteType.find({
      semesterId,
      noteYear: Number(year),
    })
      .select("_id noteType noteYear")
      .sort({ noteType: 1 })
      .lean();

    const noteTypeList = noteTypes.map((note) => ({
      id: note._id,
      name: note.noteType,
      year: note.noteYear,
    }));

    return res.status(200).json({
      success: true,
      noteTypes: noteTypeList,
    });
  } catch (error) {
    console.error("getNotetype error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching note types",
    });
  }
};

export const getResourse = async (req, res) => {
  try {
    const { noteTypeId } = req.body;

    if (!noteTypeId) {
      return res.status(400).json({
        success: false,
        message: "noteTypeId is required",
      });
    }

    const resourses = await Resourse.find({ noteTypeId })
      .select("_id resourseTitle link stars")
      .sort({ createdAt: -1 })
      .lean();

    const resourseList = resourses.map((resourse) => ({
      id: resourse._id,
      name: resourse.resourseTitle,
      link: resourse.link,
      star: resourse.stars ?? 0,
    }));

    return res.status(200).json({
      success: true,
      resourses: resourseList,
    });
  } catch (error) {
    console.error("getResourse error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching resources",
    });
  }
};



