import User from "../models/user.model.js";

export const existUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "_id email fullname avatar"
    );

    if (!user) {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      exists: true,
      message: "User exists",
      user,
    });
  } catch (error) {
    console.error("existUser error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while checking user",
    });
  }
};
export const loginUser = async (req, res) => {};
