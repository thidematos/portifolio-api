const { S3Client } = require('@aws-sdk/client-s3');

class Bucket {
  constructor() {}

  getClient() {
    return new S3Client({
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS,
        secretAccessKey: process.env.BUCKET_PASSWORD,
      },
      region: process.env.BUCKET_REGION,
    });
  }

  getName() {
    return process.env.BUCKET_NAME;
  }
}

module.exports = new Bucket();
