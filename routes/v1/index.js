const express = require("express");
const userRouter = require("./api/userRouter");
const meRouter = require("./api/meRouter");
const teamRouter = require("./api/teamRouter");
const candidateRouter = require("./api/candidateRouter");
const authRouter = require("./api/authRouter");

const router = express.Router();

router.use("/auth", authRouter); //지원
router.use("/me", meRouter); //지원
router.use("/users", userRouter); //지영
// router.use("/teams", teamRouter);
// router.use("/candidates", candidateRouter);

module.exports = router;
