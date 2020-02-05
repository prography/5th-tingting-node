const express = require('express')
const {
  kakaoLogin,
  localLogin,
  localSignup,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth,
  checkValidityForIdAndSendEmail,
  checkValidityForPassword,
  resetPassword
} = require('../../../controllers/authController')
const { verifyToken, verifyEmailToken } = require('../../../middlewares/auth')
const router = express.Router()

router.post('/kakao/login', kakaoLogin)
router.post('/local/login', localLogin)
router.post('/local/signup', localSignup)
router.get('/duplicate-id', checkDuplicateLocalId)
router.get('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidityAndSendEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)
router.get('/find/id', checkValidityForIdAndSendEmail)
router.get('/find/password', checkValidityForPassword)
router.post('/reset/password', verifyToken, resetPassword)

module.exports = router
