import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Semester = mongoose.model("Semester", semesterSchema);

export default Semester;
