import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    stars: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
