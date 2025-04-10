const { cloudinary } = require("../config/cloudinaryConfig");

// 💠 UPLOAD MEDIA FILE TO CLOUDINARY (IMAGES, VIDEOS, ETC.)
const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);
    throw new Error("ERROR WHILE UPLOADING FILE TO CLOUDINARY");
  }
};

// 💠 DELETE MEDIA FILE FROM CLOUDINARY BY PUBLIC ID
const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("CLOUDINARY DELETE ERROR:", error);
    throw new Error("ERROR WHILE DELETING FILE FROM CLOUDINARY");
  }
};

// ✨ EXPORTING CLOUDINARY UTILITY FUNCTIONS
module.exports = {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
};