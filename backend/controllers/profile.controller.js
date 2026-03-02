import User from "../models/user.model.js";

const SELF_PROFILE_MARKER = "0nkqp94v";

export const getProfileDetails = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }

    const requestedId = id.trim();
    let targetUserId = requestedId;
    let owner = false;

    if (requestedId === SELF_PROFILE_MARKER) {
      if (!req.userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      targetUserId = req.userId;
      owner = true;
    }

    const user = await User.findById(targetUserId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      owner,
      user,
    });
  } catch (error) {
    console.error("getProfileDetails error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile details",
    });
  }
};

export const updateProfileDetails = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { fullname, college, bio } = req.body;
    const updatePayload = {};

    if (typeof fullname === "string" && fullname.trim()) {
      updatePayload.fullname = fullname.trim();
    }
    if (typeof college === "string" && college.trim()) {
      updatePayload.college = college.trim();
    }
    if (typeof bio === "string" && bio.trim()) {
      updatePayload.bio = bio.trim();
    }

    if (req.file?.path) {
      updatePayload.avatar = req.file.path;
    }

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field or profilePhoto is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updatePayload, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("updateProfileDetails error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
    });
  }
};
