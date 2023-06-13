const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: 'DO00VPUGECFRVBKFL3F8',
  secretAccessKey: 'nhEilrNgaLLeUBZ23kswNHZWE1cpuxx1uwUwTLJHLs8',
  region: 'fra1',
  endpoint: 'fra1.digitaloceanspaces.com',
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sentierri-erp',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded');
});

module.exports = router;