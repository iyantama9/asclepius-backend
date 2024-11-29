const express = require('express');
const upload = require('../config/multerConfig');
const { predict } = require('../controllers/predictionController');

const router = express.Router();

router.post('/predict', upload.single('image'), predict);

module.exports = router;
