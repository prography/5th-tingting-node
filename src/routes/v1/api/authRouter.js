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
  checkEmailAuth,
  checkValidityForIdAndSendEmail,
  checkValidityForPasswordAndSendEmail,
  confirmEmailCodeForPassword,
  checkEmailAuthForPassword,
  resetPassword
} = require('../../../controllers/authController')
const { verifyEmailToken, verifyToken } = require('../../../middlewares/auth')
const { uploadThumbnailToS3 } = require('../../../middlewares/profileImg')
const router = express.Router()

router.post('/kakao/login', kakaoLogin)
router.post('/local/login', localLogin)
router.post('/local/signup', localSignup)
router.post('/thumbnail-img', verifyToken, uploadThumbnailToS3, uploadThumbnail)

router.get('/duplicate-id', checkDuplicateLocalId)
router.get('/duplicate-name', checkDuplicateName)

router.post('/school', checkValidityAndSendEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)

router.get('/find/id', checkValidityForIdAndSendEmail)
router.get('/find/password', checkValidityForPasswordAndSendEmail)
router.get('/find/password/confirm', confirmEmailCodeForPassword)
router.get('/find/password/complete', checkEmailAuthForPassword)

router.post('/reset/password', resetPassword)

module.exports = router
