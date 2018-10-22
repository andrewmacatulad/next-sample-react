const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../../config/keys");

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretKey
});

module.exports = app => {
  app.get("/api/upload", (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    console.log("Key ", key);
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "test-social-123",
        ContentType: "image/jpeg",
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  });
};
