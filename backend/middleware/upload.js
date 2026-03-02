import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => {

    return {
      folder: "NoteBhandar" || "post",
      resource_type: "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage });

export default upload;
