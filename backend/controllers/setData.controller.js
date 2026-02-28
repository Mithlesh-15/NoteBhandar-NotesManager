import College from "../models/college.model.js";
import Course from "../models/course.model.js";
import Subject from "../models/subject.model.js";

export const createCollegeCourseSubject = async (req, res) => {
  try {
    const { collegeName, courseName, subjectName } = req.body;

    const normalizedCollegeName = typeof collegeName === "string" ? collegeName.trim() : "";
    const normalizedCourseName = typeof courseName === "string" ? courseName.trim() : "";
    const normalizedSubjectName = typeof subjectName === "string" ? subjectName.trim() : "";

    if (!normalizedCollegeName || !normalizedCourseName || !normalizedSubjectName) {
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
