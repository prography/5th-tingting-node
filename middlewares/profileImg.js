const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
})

const options = {
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key (req, file, cb) {
      cb(null, `${+new Date()}${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 200 * 1024 * 1024 }
}

const thumbnailMulter = multer(options).single('thumbnail')
const profileImgMulter = multer(options).single('profileImg')

const uploadThumbnailToS3 = (req, res, next) => {
  thumbnailMulter(req, res, error => {
    if (error) {
      const errorMessage = error.message
      console.log(error)
      res.status(500).json({ errorMessage })
    } else {
      if (!req.file) {
        const errorMessage = '파일이 존재하지 않습니다.'
        console.log({ errorMessage })
        console.log(error)
        res.status(500).json({ errorMessage })
      }
      next()
    }
  })
}

const uploadProfileImgToS3 = (req, res, next) => {
  profileImgMulter(req, res, error => {
    if (error) {
      const errorMessage = error.message
      console.log(error)
      res.status(500).json({ errorMessage })
    } else {
      if (!req.file) {
        const errorMessage = '파일이 존재하지 않습니다.'
        console.log({ errorMessage })
        console.log(error)
        res.status(500).json({ errorMessage })
      }
      next()
    }
  })
}

module.exports = {
  uploadThumbnailToS3,
  uploadProfileImgToS3
}
