const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const Material = require('../models/material');
const Customer = require('../models/customer');
const dotenv = require('dotenv');
dotenv.config();

const spacesEndpoint = new AWS.Endpoint('https://sentierri-erp.fra1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
  })
});

exports.uploadFile = upload.single('file');

exports.saveFileData = async (req, res) => {
  const { topic, entityId } = req.body;
  const fileUrl = req.file.location;

  if (topic === 'material') {
    await Material.update({ imageUrl: fileUrl }, { where: { id: entityId } });
  } else if (topic === 'customer') {
    await Customer.update({ imageUrl: fileUrl }, { where: { id: entityId } });
  }

  res.json({ message: 'File uploaded successfully', fileUrl });
};
