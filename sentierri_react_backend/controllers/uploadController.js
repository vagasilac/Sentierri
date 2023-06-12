const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');

aws.config.update({
  secretAccessKey: 'DO00FXG2CJUBA9VVVZRR',
  accessKeyId: 'JI88DR3C9NFWJhDLulXbkY0lz8uunJ33cYnJn4OkbrU',
  region: 'fra1'
});

const s3 = new aws.S3({
    endpoint: 'https://sentierri.fra1.digitaloceanspaces.com',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sentierri',
    acl: 'private',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  })
});

const uploadFile = (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    // Send back only the filename
    console.log('req.file: ', req.file);
    res.status(200).json({ filename: req.file.filename });
  });
};


module.exports = { uploadFile };
