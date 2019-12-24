const express = require("express");
const { getTeamList } = require("../../../controllers/userController");
const { getUserInfo } = require("../../../controllers/userController");
const { getMatchingList } = require("../../../controllers/userController");
const {updateUserInfo} = require("../../../controllers/userController");

const router = express.Router();

//router.get("/teams/:id", getTeamList);
router.get('/:id/profile', getUserInfo); //다른사람 프로필 보기
//router.get('/:id/m',getMatchingList);
//router.patch('/:id/update',updateUserInfo);
module.exports = router;

