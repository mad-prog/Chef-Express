const multer = require("multer");
const storage = require("../config/cloudinary");

const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
