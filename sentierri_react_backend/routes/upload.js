const express = require('express');
const router = express.Router();
const { uploadFile, upload } = require('../controllers/uploadController');

router.post('/', upload.single('file'), uploadFile);

module.exports = router;