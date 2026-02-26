import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
    
    },
  },
  {
    timestamps: true,
  }
);

const College = mongoose.model("College", collegeSchema);

export default College;
