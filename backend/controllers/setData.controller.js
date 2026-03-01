import College from "../models/college.model.js";
import Course from "../models/course.model.js";
import Subject from "../models/subject.model.js";
import Semester from "../models/semester.model.js";
import NoteType from "../models/notetype.model.js";
import Resourse from "../models/resourse.model.js";
import mongoose from "mongoose";

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
    const { semesterId, noteType, noteYear, noteTypeId, resourseTitle, link } =
      req.body;
    const owner = req.userId;

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const normalizedResourseTitle =
      typeof resourseTitle === "string" ? resourseTitle.trim() : "";
    const normalizedLink = typeof link === "string" ? link.trim() : "";

    if (!normalizedResourseTitle || !normalizedLink) {
      return res.status(400).json({
        success: false,
        message: "resourseTitle and link are required",
      });
    }

    let resolvedNoteType = null;

    if (noteTypeId) {
      if (!mongoose.Types.ObjectId.isValid(noteTypeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid noteTypeId",
        });
      }

      resolvedNoteType = await NoteType.findById(noteTypeId).lean();

      if (!resolvedNoteType) {
        return res.status(404).json({
          success: false,
          message: "Note type not found for provided noteTypeId",
        });
      }
    } else {
      if (!semesterId || !noteType || noteType.trim() === "" || !noteYear) {
        return res.status(400).json({
          success: false,
          message:
            "When noteTypeId is not provided, semesterId, noteType and noteYear are required",
        });
      }

      resolvedNoteType = await NoteType.findOne({
        semesterId,
        noteType: noteType,
        noteYear: Number(noteYear),
      }).lean();

      if (!resolvedNoteType) {
        resolvedNoteType = await NoteType.create({
          semesterId,
          noteType: noteType,
          noteYear: Number(noteYear),
        });
      }
    }

    const newResourse = await Resourse.create({
      noteTypeId: resolvedNoteType._id,
      resourseTitle: resourseTitle,
      owner,
      link: link,
    });

    return res.status(201).json({
      success: true,
      message: "Note type and resource created successfully",
    });
  } catch (error) {
    console.error("createResourse error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating resource",
    });
  }
};
