const multer = require('multer');

// Configure storage engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const sanitizedFilename = file.originalname.replace(/\s+/g, ""); // //remove the spaces
        cb(null, "api-img"+ Date.now() + '-' + sanitizedFilename); // Generate a unique filename
    }
});

// Ser file size limits and file filter
let uploadFile = multer({
    storage: fileStorageEngine,
    limits: {
        fileSize: 8 * 1024 * 1024 // Set file size limit to 5MB
    },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

module.exports = uploadFile;

