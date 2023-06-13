const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
  endpoint: 'https://fra1.digitaloceanspaces.com', 
  accessKeyId: 'DO00VPUGECFRVBKFL3F8',
  secretAccessKey: 'nhEilrNgaLLeUBZ23kswNHZWE1cpuxx1uwUwTLJHLs8',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});

const uploadFile = (fileName, filePath, fileType) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: 'sentierri-erp',
    Key: fileName,
    Body: fileContent,
    ContentType: fileType
  };

  s3.upload(params, function(err, data) {
    if (err) {
      console.log('Error', err.stack);
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = { uploadFile, upload };