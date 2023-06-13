const AWS = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');
// require('dotenv').config();

const BUCKET_NAME = "sentierri-erp";
const IAM_USER_KEY = "DO00VPUGECFRVBKFL3F8";
const IAM_USER_SECRET = "nhEilrNgaLLeUBZ23kswNHZWE1cpuxx1uwUwTLJHLs8";

// const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
// const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
// const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

console.log(`Bucket: ${BUCKET_NAME}`);
console.log(`Access Key ID: ${IAM_USER_KEY}`);
console.log(`Secret Access Key: ${IAM_USER_SECRET}`);

const spacesEndpoint = new AWS.Endpoint('https://sentierri-erp.fra1.digitaloceanspaces.com');

AWS.config.logger = console;
AWS.config.update({logger: console});

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "DO00VPUGECFRVBKFL3F8",
  secretAccessKey: "nhEilrNgaLLeUBZ23kswNHZWE1cpuxx1uwUwTLJHLs8",
  signatureVersion: 'v4',
  sslEnabled: true,
  s3ForcePathStyle: true,
  region: 'fra1' 
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sentierri-erp",
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
  try {
    console.log('file to be uploaded - ', req.file);

    const fileContent = fs.readFileSync(req.file.path);

    const params = {
      Bucket: "sentierri-erp",
      Key: `${Date.now()}_${req.file.originalname}`, // File name you want to save as in S3
      Body: fileContent,
      ACL: 'public-read',
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        console.error(`Error uploading file: ${err}`);
        res.status(500).send(err);
      } else {
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
      }
    });
  } catch (err) {
    console.error(`Exception caught: ${err}`);
    res.status(500).send(err);
  }
};

module.exports = {
  uploadFile,
  upload,
};
