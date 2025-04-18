const cloudinary = require("cloudinary").v2;

// 🔹 Configures Cloudinary SDK with environment variables
const configureCloudinary = () => {
  try {
    // Validate required environment variables
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("Missing Cloudinary configuration environment variables");
    }

    // Configure Cloudinary SDK
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    console.log("Cloudinary configured successfully");
  } catch (error) {
    console.log("Cloudinary configuration failed:", error.message);
    throw error;
  }
};

module.exports = { cloudinary, configureCloudinary };