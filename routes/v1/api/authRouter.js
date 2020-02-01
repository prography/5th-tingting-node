const express = require('express')
const {
  kakaoLogin,
  localLogin,
  localSignup,
  //localSignupFinal,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth
} = require('../../../controllers/authController')
const { verifyEmailToken } = require('../../../middlewares/auth')
const {upload} = require('../../../middlewares/profileImg')
const router = express.Router()

router.post('/kakao/login', kakaoLogin)
router.post('/local/login', localLogin)
// router.post('/local/signup', localSignup, upload.single('thumbnail'), localSignupFinal)
router.post('/local/signup', upload.single('thumbnail'), localSignup)
router.get('/duplicate-id', checkDuplicateLocalId)
router.get('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidityAndSendEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)

module.exports = router
