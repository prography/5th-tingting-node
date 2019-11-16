const express = require("express");
const userRouter = require("./api/userRouter");
const teamRouter = require("./api/teamRouter");
const candidateRouter = require("./api/candidateRouter");
const authRouter = require("./api/authRouter");

const router = express.Router();

//router.use("/auth", authRouter);
//router.use("/users", userRouter);
//router.use("/teams", teamRouter);
//router.use("/candidates", candidateRouter);

module.exports = router;
