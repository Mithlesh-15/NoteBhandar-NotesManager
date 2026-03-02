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
      default:"https://i.pinimg.com/736x/0d/5f/db/0d5fdb930b2376a39e36ae11abc304d6.jpg"
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
