const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const fs = require('fs')
const md5 = require('md5')

AWS.config.update({
  region: 'ap-northeast-2',
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      console.log(file)
      cb(null, `${md5(file)}`);
    },
  }),
  limits: { fileSize: 200 * 1024 * 1024 },
});

module.exports = {
    upload
  }