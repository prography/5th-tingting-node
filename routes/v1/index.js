const express = require('express')
const userRouter = require('./api/userRouter')
const meRouter = require('./api/meRouter')
const teamRouter = require('./api/teamRouter')
const authRouter = require('./api/authRouter')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/me', meRouter)
router.use('/users', userRouter)
router.use('/teams', teamRouter)

module.exports = router
