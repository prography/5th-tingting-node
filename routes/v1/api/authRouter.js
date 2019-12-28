const express = require('express')
const {
  signup,
  login,
  logout,
  checkDuplicateName,
  checkValidSchool,
  confirmEmailToken
} = require('../../../controllers/authController')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidSchool)
router.post('/school/confirm', confirmEmailToken)

module.exports = router
