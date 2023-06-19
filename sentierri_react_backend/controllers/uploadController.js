const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {config} = require('dotenv');

config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: new AWS.Endpoint(`${process.env.AWS_REGION}.digitaloceanspaces.com`),
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

const uploadFile = (req, res) => {
  upload.single('file')(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error(err);
      return res.status(500).json({error: err.message});
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error(err);
      return res.status(500).json({error: err.message});
    }
    // Everything went fine.
    res.send({fileUrl: req.file.location});
  });
};

module.exports = {
  uploadFile
};