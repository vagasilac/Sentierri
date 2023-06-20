const express = require('express');
const router = express.Router();

const { uploadFile, deleteFile } = require('../controllers/uploadController');

router.post('/', uploadFile);
router.post('/:key', deleteFile);

module.exports = router;