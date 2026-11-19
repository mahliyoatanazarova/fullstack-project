
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new Error("Bunday file turi qabul qilinmaydi");
        error.statusCode = 400;
        cb(error, false);
    }
};

const uploads = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = uploads;
