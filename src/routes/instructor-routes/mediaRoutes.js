const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../helpers/cloudinary");

// 🔹 INITIALIZE EXPRESS ROUTER
const router = express.Router();

// 🌀 CONFIGURE MULTER FOR TEMPORARY FILE STORAGE
const upload = multer({
  dest: "uploads/",
  limits: {
    files: 10, // MAX 10 FILES FOR BULK UPLOAD
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("INVALID FILE TYPE - ONLY IMAGES/VIDEOS ALLOWED"), false);
    }
  },
});

// ✨ UPLOAD SINGLE MEDIA FILE TO CLOUDINARY (POST /media/upload)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "NO FILE PROVIDED IN REQUEST",
      });
    }

    const result = await uploadMediaToCloudinary(req.file.path);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("MEDIA UPLOAD ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "MEDIA UPLOAD FAILED",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

// ✨ DELETE MEDIA FROM CLOUDINARY BY PUBLIC_ID (DELETE /media/delete/:id)
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ASSET ID IS REQUIRED",
      });
    }

    await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "ASSET DELETED SUCCESSFULLY",
    });
  } catch (error) {
    console.error("MEDIA DELETION ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "MEDIA DELETION FAILED",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

// ✨ UPLOAD MULTIPLE MEDIA FILES TO CLOUDINARY (MAX 10) (POST /media/bulk-upload)
router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "NO FILES PROVIDED FOR BULK UPLOAD",
      });
    }

    const uploadPromises = req.files.map((file) =>
      uploadMediaToCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error("BULK UPLOAD ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "BULK UPLOAD FAILED",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

module.exports = router;