import College from "../models/college.model.js";
import Course from "../models/course.model.js";
import Subject from "../models/subject.model.js";
import Semester from "../models/semester.model.js";
import NoteType from "../models/notetype.model.js";
import Resourse from "../models/resourse.model.js";

export const createCollegeCourseSubject = async (req, res) => {
  try {
    const { collegeName, courseName, subjectName } = req.body;

    const normalizedCollegeName =
      typeof collegeName === "string" ? collegeName.trim() : "";
    const normalizedCourseName =
      typeof courseName === "string" ? courseName.trim() : "";
    const normalizedSubjectName =
      typeof subjectName === "string" ? subjectName.trim() : "";

    if (
      !normalizedCollegeName ||
      !normalizedCourseName ||
      !normalizedSubjectName
    ) {
      return res.status(400).json({
        success: false,
        message: "collegeName, courseName and subjectName are required",
      });
    }

    const newCollege = await College.create({
      collegeName: collegeName,
    });

    const newCourse = await Course.create({
      courseName: courseName,
      collegeId: newCollege._id,
    });

    const newSubject = await Subject.create({
      subjectName: subjectName,
      courseId: newCourse._id,
    });

    return res.status(201).json({
      success: true,
      message: "College, course and subject created successfully",
      ids: {
        collegeId: newCollege._id,
        courseId: newCourse._id,
        subjectId: newSubject._id,
      },
    });
  } catch (error) {
    console.error("createCollegeCourseSubject error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating data",
    });
  }
};

export const createSemester = async (req, res) => {
  try {
    const { subjectId, semester } = req.body;

    if (!subjectId || !semester || semester.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "subjectId and semester are required",
      });
    }

    const newSemester = await Semester.create({
      subjectId,
      semester,
    });

    return res.status(201).json({
      success: true,
      message: "Semester created successfully",
      semesterId: newSemester._id,
    });
  } catch (error) {
    console.error("createSemester error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating semester",
    });
  }
};

export const createResourse = async (req, res) => {
  try {
    const { semesterId, noteType, noteYear, resourseTitle, link } = req.body;
    const owner = req.userId;

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      !semesterId ||
      !noteType ||
      noteType.trim() === "" ||
      !noteYear ||
      !resourseTitle ||
      resourseTitle.trim() === "" ||
      !link ||
      link.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "semesterId, noteType, noteYear, resourseTitle and link are required",
      });
    }

    const newNoteType = await NoteType.create({
      semesterId,
      noteType,
      noteYear,
    });

    const newResourse = await Resourse.create({
      noteTypeId: newNoteType._id,
      resourseTitle,
      owner,
      link,
    });

    return res.status(201).json({
      success: true,
      message: "Note type and resource created successfully",
      ids: {
        noteTypeId: newNoteType._id,
        resourseId: newResourse._id,
      },
    });
  } catch (error) {
    console.error("createResourse error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating resource",
    });
  }
};
