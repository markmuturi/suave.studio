import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(file.mimetype);
    isValid ? cb(null, true) : cb(new Error("Only image files are allowed!"));
};

const upload = multer({ storage, fileFilter });
export default upload;