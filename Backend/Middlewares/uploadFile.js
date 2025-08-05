import multer from "multer";

// Use memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = function (req, file, cb) {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg, .png, .jpeg files are allowed"), false);
    }
};

// Create upload middleware
export const picUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Error handler for multer errors
export const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    }
    if (err.message.includes("Only .jpg")) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
};