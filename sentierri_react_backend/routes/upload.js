const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const spacesEndpoint = new AWS.Endpoint('https://sentierri.fra1.cdn.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'DO00FXG2CJUBA9VVVZRR',
  secretAccessKey: 'JI88DR3C9NFWJhDLulXbkY0lz8uunJ33cYnJn4OkbrU'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sentierri',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

router.post('/upload', function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.redirect("/error");
    }
    console.log('File uploaded successfully.');
    response.redirect("/success");
  });
});

module.exports = router;