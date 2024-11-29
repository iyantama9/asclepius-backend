const express = require('express');
const { getHistories } = require('../controllers/historyController');

const router = express.Router();

router.get('/histories', getHistories);

module.exports = router;
