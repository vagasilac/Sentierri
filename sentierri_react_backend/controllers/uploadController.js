const AWS = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  endpoint: 'sentierri.fra1.digitaloceanspaces.com',
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const uploadFile = (req, res) => {
  console.log('file uploaded - ', req.file);

  const fileContent = fs.readFileSync(req.file.path);

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${Date.now()}_${req.file.originalname}`, // File name you want to save as in S3
    Body: fileContent,
    ACL: 'public-read',
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);

    // Create a new object with only the properties you need
    const responseData = {
      Location: data.Location,
      ETag: data.ETag,
      Key: data.Key,
      Bucket: data.Bucket,
    };

    // Use the custom replacer function when calling JSON.stringify
    const cache = new Set();
    const replacer = (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          // Circular reference found
          return;
        }
        // Store value in our set
        cache.add(value);
      }
      return value;
    };
    
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(responseData, replacer));
  });
};

module.exports = {
  uploadFile,
  upload,
};