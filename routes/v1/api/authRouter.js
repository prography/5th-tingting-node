const express = require('express')
const {
  kakaoLogin,
  localLogin,
  localSignup,
  uploadThumbnail,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth
} = require('../../../controllers/authController')
const { verifyEmailToken, verifyToken } = require('../../../middlewares/auth')
const { upload } = require('../../../middlewares/profileImg')
const router = express.Router()

router.post('/kakao/login', kakaoLogin)
router.post('/local/login', localLogin)
router.post('/local/signup', localSignup)
router.post('/thumbnail-img', verifyToken, upload.single('thumbnail'), uploadThumbnail)
router.get('/duplicate-id', checkDuplicateLocalId)
router.get('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidityAndSendEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)

module.exports = router
