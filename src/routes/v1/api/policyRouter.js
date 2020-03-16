const express = require('express')
const { getRule, getPrivacy } = require('../../../controllers/policyController')

const router = express.Router()

router.get('/rule', getRule)
router.get('/privacy', getPrivacy)

module.exports = router
