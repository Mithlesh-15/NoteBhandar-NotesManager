import Resourse from "../models/resourse.model.js";
import NoteType from "../models/notetype.model.js";
import Semester from "../models/semester.model.js";
import Subject from "../models/subject.model.js";
import Course from "../models/course.model.js";
import College from "../models/college.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail.js";

const INCREASE_QUERIES = new Set(["increase", "inc", "up", "add", "plus"]);
const DECREASE_QUERIES = new Set([
  "decrease",
  "dec",
  "down",
  "remove",
  "minus",
]);

export const updateStar = async (req, res) => {
  try {
    const { resourseId } = req.body;
    const { query } = req.query;

    if (!resourseId || typeof resourseId !== "string") {
      return res.status(400).json({
        success: false,
        message: "resourseId is required",
      });
    }

    const normalizedQuery =
      typeof query === "string" ? query.trim().toLowerCase() : "";

    let delta = 0;
    if (INCREASE_QUERIES.has(normalizedQuery)) {
      delta = 1;
    } else if (DECREASE_QUERIES.has(normalizedQuery)) {
      delta = -1;
    } else {
      return res.status(400).json({
        success: false,
        message: "query must be increase or decrease",
      });
    }

    const resource = await Resourse.findById(resourseId)
      .select("_id owner stars")
      .lean();

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (delta === -1 && (resource.stars ?? 0) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Resource star is already 0",
      });
    }

    const updatedResource = await Resourse.findByIdAndUpdate(
      resource._id,
      { $inc: { stars: delta } },
      { returnDocument: "after" },
    )
      .select("_id stars owner")
      .lean();

    if (!updatedResource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (delta === 1) {
      await User.findByIdAndUpdate(updatedResource.owner, {
        $inc: { stars: 1 },
      });
    } else {
      await User.updateOne(
        { _id: updatedResource.owner, stars: { $gt: 0 } },
        { $inc: { stars: -1 } },
      );
    }

    const owner = await User.findById(updatedResource.owner)
      .select("_id stars")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Star updated successfully",
      resource: {
        id: updatedResource._id,
        star: updatedResource.stars ?? 0,
      },
      owner: {
        id: owner?._id ?? updatedResource.owner,
        star: owner?.stars ?? 0,
      },
    });
  } catch (error) {
    console.error("updateStar error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating star",
    });
  }
};

export const deleteResourseWithCascade = async (req, res) => {
  try {
    const resourseId = req.body?.resourseId || req.params?.resourseId;

    if (!resourseId || typeof resourseId !== "string") {
      return res.status(400).json({
        success: false,
        message: "resourseId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(resourseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resourseId",
      });
    }

    const resourse = await Resourse.findById(resourseId)
      .select("_id noteTypeId owner stars")
      .lean();

    if (!resourse) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    await Resourse.deleteOne({ _id: resourse._id });

    const resourceStars = Number(resourse.stars) || 0;
    if (resourceStars > 0 && resourse.owner) {
      const owner = await User.findById(resourse.owner)
        .select("_id stars")
        .lean();
      const updatedOwnerStars = Math.max(
        (owner?.stars ?? 0) - resourceStars,
        0,
      );

      await User.updateOne(
        { _id: resourse.owner },
        { $set: { stars: updatedOwnerStars } },
      );
    }

    const deleted = {
      resourseId: resourse._id,
      noteTypeId: null,
      semesterId: null,
      subjectId: null,
      courseId: null,
      collegeId: null,
    };

    let stoppedAt = null;

    const noteTypeInUse = await Resourse.exists({
      noteTypeId: resourse.noteTypeId,
    });
    if (noteTypeInUse) {
      stoppedAt = "noteType";
      return res.status(200).json({
        success: true,
        message: "Resource deleted successfully",
        deleted,
        stoppedAt,
      });
    }

    const noteType = await NoteType.findById(resourse.noteTypeId)
      .select("_id semesterId")
      .lean();

    if (!noteType) {
      stoppedAt = "noteTypeMissing";
      return res.status(200).json({
        success: true,
        message: "Resource deleted. Note type already missing",
        deleted,
        stoppedAt,
      });
    }

    await NoteType.deleteOne({ _id: noteType._id });
    deleted.noteTypeId = noteType._id;

    const semesterInUse = await NoteType.exists({
      semesterId: noteType.semesterId,
    });
    if (semesterInUse) {
      stoppedAt = "semester";
      return res.status(200).json({
        success: true,
        message: "Resource and note type deleted successfully",
        deleted,
        stoppedAt,
      });
    }

    const semester = await Semester.findById(noteType.semesterId)
      .select("_id subjectId")
      .lean();

    if (!semester) {
      stoppedAt = "semesterMissing";
      return res.status(200).json({
        success: true,
        message: "Resource and note type deleted. Semester already missing",
        deleted,
        stoppedAt,
      });
    }

    await Semester.deleteOne({ _id: semester._id });
    deleted.semesterId = semester._id;

    const subjectInUse = await Semester.exists({
      subjectId: semester.subjectId,
    });
    if (subjectInUse) {
      stoppedAt = "subject";
      return res.status(200).json({
        success: true,
        message: "Resource, note type and semester deleted successfully",
        deleted,
        stoppedAt,
      });
    }

    const subject = await Subject.findById(semester.subjectId)
      .select("_id courseId")
      .lean();

    if (!subject) {
      stoppedAt = "subjectMissing";
      return res.status(200).json({
        success: true,
        message:
          "Resource, note type and semester deleted. Subject already missing",
        deleted,
        stoppedAt,
      });
    }

    await Subject.deleteOne({ _id: subject._id });
    deleted.subjectId = subject._id;

    const courseInUse = await Subject.exists({ courseId: subject.courseId });
    if (courseInUse) {
      stoppedAt = "course";
      return res.status(200).json({
        success: true,
        message:
          "Resource, note type, semester and subject deleted successfully",
        deleted,
        stoppedAt,
      });
    }

    const course = await Course.findById(subject.courseId)
      .select("_id collegeId")
      .lean();

    if (!course) {
      stoppedAt = "courseMissing";
      return res.status(200).json({
        success: true,
        message:
          "Resource, note type, semester and subject deleted. Course already missing",
        deleted,
        stoppedAt,
      });
    }

    await Course.deleteOne({ _id: course._id });
    deleted.courseId = course._id;

    const collegeInUse = await Course.exists({ collegeId: course.collegeId });
    if (collegeInUse) {
      stoppedAt = "college";
      return res.status(200).json({
        success: true,
        message:
          "Resource, note type, semester, subject and course deleted successfully",
        deleted,
        stoppedAt,
      });
    }

    const college = await College.findById(course.collegeId)
      .select("_id")
      .lean();

    if (!college) {
      stoppedAt = "collegeMissing";
      return res.status(200).json({
        success: true,
        message:
          "Resource, note type, semester, subject and course deleted. College already missing",
        deleted,
        stoppedAt,
      });
    }

    await College.deleteOne({ _id: college._id });
    deleted.collegeId = college._id;

    return res.status(200).json({
      success: true,
      message:
        "Resource, note type, semester, subject, course and college deleted successfully",
      deleted,
      stoppedAt: "none",
    });
  } catch (error) {
    console.error("deleteResourseWithCascade error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting resource",
    });
  }
};

export const feedBackAndReport = async (req, res) => {
  try {
    const { id, name, subject, message, messege } = req.body;

    const normalizedId = typeof id === "string" ? id.trim() : "";
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedSubject = typeof subject === "string" ? subject.trim() : "";
    const normalizedMessage =
      typeof message === "string"
        ? message.trim()
        : typeof messege === "string"
          ? messege.trim()
          : "";

    if (
      !normalizedId ||
      !normalizedName ||
      !normalizedSubject ||
      !normalizedMessage
    ) {
      return res.status(400).json({
        success: false,
        message: "id, name, subject and message are required",
      });
    }

    const mailSubject = normalizedId === "pase549nsy" ? "Feed Back" : "Report";
    const isFeedbackMail = mailSubject.toLowerCase().includes("feed");
    const theme = isFeedbackMail
      ? {
          border: "#3b82f6",
          header: "#2563eb",
          background: "#eff6ff",
          text: "#1e3a8a",
          title: "Feedback Notification",
        }
      : {
          border: "#ef4444",
          header: "#dc2626",
          background: "#fef2f2",
          text: "#7f1d1d",
          title: "Report Notification",
        };

    const mailMessage = `
      <div style="max-width:640px;margin:0 auto;background:${theme.background};border:2px solid ${theme.border};border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;color:${theme.text};">
        <div style="background:${theme.header};color:#ffffff;padding:14px 18px;font-size:18px;font-weight:700;">
          ${theme.title}
        </div>
        <div style="padding:16px 18px;">
          <p style="margin:8px 0;"><strong>Name:</strong> ${normalizedName}</p>
          <p style="margin:8px 0;"><strong>Subject:</strong> ${normalizedSubject}</p>
          <p style="margin:8px 0;"><strong>Message:</strong> ${normalizedMessage}</p>
          <p style="margin:8px 0;"><strong>ID:</strong> ${normalizedId}</p>
        </div>
      </div>
    `;

    await sendMail(mailSubject, mailMessage);

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.error("sendActionMail error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending mail",
    });
  }
};
