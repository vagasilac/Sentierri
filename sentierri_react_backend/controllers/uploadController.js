const s3 = require('s3-client');
const fs = require('fs');

const client = s3.createClient({
  s3Options: {
    accessKeyId: "DO00VPUGECFRVBKFL3F8",
    secretAccessKey: "nhEilrNgaLLeUBZ23kswNHZWE1cpuxx1uwUwTLJHLs8",
    region: "fra1",
    endpoint: 'fra1.digitaloceanspaces.com',
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: 'v4'
  },
});

exports.uploadImage = (req, res) => {
  var params = {
    localFile: req.file.path,
   
    s3Params: {
      Bucket: "sentierri-erp",
      Key: req.file.originalname,
      ACL: 'public-read'
      // other options supported by putObject, except Body and ContentLength. 
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
    },
  };

  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
    res.status(500).json({ error: "Error : " + err });
  });
  uploader.on('end', function() {
    console.log("done uploading");
    res.send(`File uploaded successfully.`);
  });
}
