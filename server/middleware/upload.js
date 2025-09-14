const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(uploadDir, file.fieldname);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;

        // Store full path in req object for later use
        if (!req.uploadedFiles) {
            req.uploadedFiles = {};
        }
        req.uploadedFiles[file.fieldname] = `/uploads/${file.fieldname}/${filename}`;

        cb(null, filename);
    }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WEBP) are allowed!'));
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: fileFilter
});

// Middleware for single image upload
const uploadSingle = (fieldName) => {
    return (req, res, next) => {
        upload.single(fieldName)(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            next();
        });
    };
};

// Middleware for multiple image uploads
const uploadMultiple = (fieldName, maxCount = 5) => {
    return (req, res, next) => {
        upload.array(fieldName, maxCount)(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            next();
        });
    };
};

// Middleware for specific field uploads
const uploadFields = (fields) => {
    return (req, res, next) => {
        upload.fields(fields)(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            next();
        });
    };
};

// Helper function to delete file
const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
};

// Helper function to get file URL
const getFileUrl = (req, filePath) => {
    if (!filePath) return null;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return `${baseUrl}${filePath}`;
};

// Generate URLs for image fields in an object
const generateURL = (req, obj, imageFields = ['promptImage', 'responseImage', 'outfitImage']) => {
    if (!obj || !req) return obj;

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const result = { ...obj };

    imageFields.forEach(field => {
        if (result[field] && typeof result[field] === 'string') {
            // If it's already a full path starting with /uploads, just add base URL
            if (result[field].startsWith('/uploads/')) {
                result[field] = `${baseUrl}${result[field]}`;
            } else {
                // If it's just a filename, construct the full path
                result[field] = `${baseUrl}/uploads/${field}/${result[field]}`;
            }
        }
    });

    return result;
};

// Generate URLs for array of objects
const generateURLs = (req, array, imageFields = ['promptImage', 'responseImage', 'outfitImage']) => {
    if (!Array.isArray(array) || !req) return array;

    return array.map(obj => generateURL(req, obj, imageFields));
};

module.exports = {
    upload,
    uploadSingle,
    uploadMultiple,
    uploadFields,
    deleteFile,
    getFileUrl,
    generateURL,
    generateURLs,
};
