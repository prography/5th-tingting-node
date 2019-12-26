const express = require("express");
const { getMyInfo } = require("../../../controllers/meController");
const { verifyToken } = require("../../../middlewares/auth");

const router = express.Router();

router.get("/profile", verifyToken, getMyInfo); // 내 프로필 보기

module.exports = router;
