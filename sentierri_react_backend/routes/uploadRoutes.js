const express = require('express');
const router = express.Router();

const { uploadFile } = require('../controllers/uploadController');

router.post('/uploads', uploadFile);

module.exports = router;