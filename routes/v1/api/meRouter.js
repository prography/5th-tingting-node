const express = require("express");
const { getMyInfo } = require("../../../controllers/meController");

const router = express.Router();

router.get('/profile', getMyInfo); // 내 프로필 보기 -> 내 정보,& 팀 리스트 & 응답요청
//router.get('/profile', getUserInfo); // 내 프로필 수정하기
//router.get('/teams/:id', getUserInfo); // 나의 개별 팀 보기

module.exports = router;