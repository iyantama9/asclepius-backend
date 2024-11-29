const multer = require('multer');
const ValidationError = require('../errors/ValidationError');

function errorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                status: 'fail',
                message: `Payload content length greater than maximum allowed: 1000000`,
            });
        }

        return res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    }

    res.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
    });
}

module.exports = errorHandler;
