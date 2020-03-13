const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  getTeamList,
  createTeam,
  checkDuplicateTeamName,
  getTeamInfo,
  joinTeam,
  getAllTagList
} = require('../../../controllers/teamController')

const router = express.Router()

router.get('/', verifyToken, getTeamList)
router.post('/', verifyToken, createTeam)
router.get('/duplicate-name', verifyToken, checkDuplicateTeamName)
router.get('/tagList',verifyToken, getAllTagList)
router.get('/:id', verifyToken, getTeamInfo)
router.post('/:id/join', verifyToken, joinTeam)

module.exports = router
