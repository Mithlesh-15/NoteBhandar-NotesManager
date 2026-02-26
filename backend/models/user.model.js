import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
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
