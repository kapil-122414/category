const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname
      .replace(/\s/g, "") // space remove
      .replace(/\//g, "") // forward slash remove
      .replace(/\\/g, ""); // backslash remove

    cb(null, Date.now() + "-" + cleanName);
  },
});
const uploads = multer({ storage: storage });

module.exports = uploads;
