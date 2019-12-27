const express = require('express')
const { getTeamList,createTeam,updateMyTeam } = require('../../../controllers/teamController')

const router = express.Router()

router.get('/',getTeamList)
router.post('/', createTeam)
router.patch('/', updateMyTeam)

module.exports = router
