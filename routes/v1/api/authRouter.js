const express = require('express')
const {
  signup,
  login,
  logout,
  checkDuplicateName
} = require('../../../controllers/authController')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('', logout)
router.get('/duplicate-name', checkDuplicateName)

module.exports = router
