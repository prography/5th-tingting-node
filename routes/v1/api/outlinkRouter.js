const express = require('express')
const { redirectToStoreUrl } = require('../../../controllers/outlinkController')

const router = express.Router()

router.get('/store', redirectToStoreUrl)

module.exports = router
