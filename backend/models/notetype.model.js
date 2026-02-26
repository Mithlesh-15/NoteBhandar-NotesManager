import mongoose from "mongoose";

const currentYear = new Date().getFullYear() + 1;

const noteTypeSchema = new mongoose.Schema(
  {
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    noteType: {
      type: String,
      required: true,
    },
    noteYear: {
      type: Number,
      required: true,
      min: 1900,
      max: currentYear,
    },
  },
  {
    timestamps: true,
  }
);

const NoteType = mongoose.model("NoteType", noteTypeSchema);

export default NoteType;
