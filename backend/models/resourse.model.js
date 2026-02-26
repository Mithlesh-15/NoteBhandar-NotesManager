import mongoose from "mongoose";

const resourseSchema = new mongoose.Schema(
  {
    noteTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NoteType",
      required: true,
    },
    resourseTitle: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
      min: 0,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resourse = mongoose.model("Resourse", resourseSchema);

export default Resourse;
