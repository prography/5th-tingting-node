const express = require("express");
const { getMyInfo,updateMyInfo } = require("../../../controllers/meController");

const router = express.Router();

router.get('/profile', getMyInfo); // 내 프로필 보기
router.patch('/profile', updateMyInfo); //내 프로필 수정

module.exports = router;