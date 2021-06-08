const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "HappyApiMeal",
  },
});

module.exports = cloudinaryStorage;
