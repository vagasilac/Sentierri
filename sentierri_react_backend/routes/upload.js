const express = require('express');
const router = express.Router();
const { uploadImage, upload } = require('../controllers/uploadController');

router.post('/upload', (req, res) => {
    // get file from req, for example if you're using multer you might do:
    // const file = req.file;
  
    // get these values from file or however your app is setup
    const fileName = 'name for file in S3';
    const filePath = 'path to file';
    const fileType = 'file mime type';
    
    uploadImage(fileName, filePath, fileType);
    
    // send response
    res.send('File uploaded');
  });

module.exports = router;