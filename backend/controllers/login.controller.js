import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const generateTokenAndSetCookie = (res, email, userId) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ email, userId }, jwtSecret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

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
      "_id email fullname",
    );

    if (!user) {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "User does not exist",
      });
    }
    generateTokenAndSetCookie(
      res,
      normalizedEmail,
      user._id.toString(),
    );
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
    const { email, fullname, college, bio } = req.body;

    if (
      !email ||
      !fullname ||
      !college ||
      !bio ||
      typeof email !== "string" ||
      typeof fullname !== "string" ||
      typeof college !== "string" ||
      typeof bio !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "email, fullname, college and bio are required",
      });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      generateTokenAndSetCookie(
        res,
        normalizedEmail,
        existingUser._id.toString(),
      );

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
      avatar:"https://i.pinimg.com/736x/0d/5f/db/0d5fdb930b2376a39e36ae11abc304d6.jpg",
      college,
      bio,
    });

    const token = generateTokenAndSetCookie(
      res,
      normalizedEmail,
      newUser._id.toString(),
    );

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
