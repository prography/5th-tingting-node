const express = require("express");
const { getMyInfo } = require("../../../controllers/meController");
const { putMyInfo } = require("../../../controllers/meController");

const router = express.Router();

router.get('/profile', getMyInfo); // 내 프로필 보기
router.patch('/profile', putMyInfo); //내 프로필 수정

module.exports = router;