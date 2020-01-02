const express = require('express')

const { getMatchingList } = require('../../../controllers/matchingController')

const router = express.Router()

router.get('/teams', getMatchingList)

module.exports = router
