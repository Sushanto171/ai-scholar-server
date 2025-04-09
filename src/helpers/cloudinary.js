const { cloudinary } = require("../config/cloudinaryConfig");

// Function to upload media to Cloudinary
const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading to Cloudinary");
  }
};

// Function to delete media from Cloudinary
const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};

module.exports = {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
};