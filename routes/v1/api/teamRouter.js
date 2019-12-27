const express = require('express')
const { createTeam,updateMyTeam } = require('../../../controllers/teamController')

const router = express.Router()

router.post('/', createTeam)
router.patch('/', updateMyTeam)

module.exports = router
