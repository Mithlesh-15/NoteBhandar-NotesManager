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

    const normalizedEmail = email.toLowerCase();
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

export const loginUser = async (req, res) => {
  try {
    const { email, fullname, avatar, college, bio } = req.body;

    if (
      !email ||
      !fullname ||
      !avatar ||
      !college ||
      !bio ||
      typeof email !== "string" ||
      typeof fullname !== "string" ||
      typeof avatar !== "string" ||
      typeof college !== "string" ||
      typeof bio !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "email, fullname, avatar, college and bio are required",
      });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        isNewUser: false,
        user: existingUser,
      });
    }

    const newUser = await User.create({
      email: normalizedEmail,
      fullname,
      avatar,
      college,
      bio,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      isNewUser: true,
      user: newUser,
    });
  } catch (error) {
    console.error("loginUser error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in user",
    });
  }
};
