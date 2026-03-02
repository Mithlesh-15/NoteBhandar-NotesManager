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
