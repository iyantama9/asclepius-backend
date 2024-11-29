const multer = require('multer');
const ValidationError = require('../errors/ValidationError');

const upload = multer({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new ValidationError('Only image files are allowed'));
        }
        cb(null, true);
    },
});

module.exports = upload;
