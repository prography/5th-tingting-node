const express = require('express')
const { getmain } = require('../../../controllers/mainController')

const router = express.Router()

router.get('/',getmain)

module.exports = router