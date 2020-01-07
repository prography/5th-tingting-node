const express = require('express')
const {
  kakaoLogin,
  localLogin,
  localSignup,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth
} = require('../../../controllers/authController')
const { verifyEmailToken } = require('../../../middlewares/auth')
const router = express.Router()

router.post('/kakao/login', kakaoLogin)
router.post('/local/login', localLogin)
router.post('/local/signup', localSignup)
router.get('/duplicate-id', checkDuplicateLocalId)
router.get('/duplicate-name', checkDuplicateName)
<<<<<<< HEAD
router.post('/school', checkValidityAndSendEmail)
router.post('/school/confirm', verifyEmailToken, confirmEmailToken)
=======
router.post('/school', checkValidEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
>>>>>>> Team Join
router.get('/school/complete', checkEmailAuth)

module.exports = router
