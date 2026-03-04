import Resourse from "../models/resourse.model.js";
import User from "../models/user.model.js";

const INCREASE_QUERIES = new Set(["increase", "inc", "up", "add", "plus"]);
const DECREASE_QUERIES = new Set(["decrease", "dec", "down", "remove", "minus"]);

export const updateStar = async (req, res) => {
  try {

    const { resourseId } = req.body;
    const { query } = req.query;

    if (!resourseId || typeof resourseId !== "string") {
      return res.status(400).json({
        success: false,
        message: "resourseId is required",
      });
    }

    const normalizedQuery = typeof query === "string" ? query.trim().toLowerCase() : "";

    let delta = 0;
    if (INCREASE_QUERIES.has(normalizedQuery)) {
      delta = 1;
    } else if (DECREASE_QUERIES.has(normalizedQuery)) {
      delta = -1;
    } else {
      return res.status(400).json({
        success: false,
        message: "query must be increase or decrease",
      });
    }

    const resource = await Resourse.findById(resourseId).select("_id owner stars").lean();

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (delta === -1 && (resource.stars ?? 0) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Resource star is already 0",
      });
    }

    const updatedResource = await Resourse.findByIdAndUpdate(
      resource._id,
      { $inc: { stars: delta } },
      { new: true }
    )
      .select("_id stars owner")
      .lean();

    if (!updatedResource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (delta === 1) {
      await User.findByIdAndUpdate(updatedResource.owner, { $inc: { stars: 1 } });
    } else {
      await User.updateOne(
        { _id: updatedResource.owner, stars: { $gt: 0 } },
        { $inc: { stars: -1 } }
      );
    }

    const owner = await User.findById(updatedResource.owner).select("_id stars").lean();

    return res.status(200).json({
      success: true,
      message: "Star updated successfully",
      resource: {
        id: updatedResource._id,
        star: updatedResource.stars ?? 0,
      },
      owner: {
        id: owner?._id ?? updatedResource.owner,
        star: owner?.stars ?? 0,
      },
    });
  } catch (error) {
    console.error("updateStar error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating star",
    });
  }
};
