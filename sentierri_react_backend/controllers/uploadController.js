const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const Material = require('../models/material');
const Customer = require('../models/customer');

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-bucket-name',
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
