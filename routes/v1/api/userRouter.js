const express = require("express");
const { getTeamList } = require("../../../controllers/userController");
const { getUserInfo } = require("../../../controllers/userController");
const { getMatchingList } = require("../../../controllers/userController");
const {updateUserInfo} = require("../../../controllers/userController");

const router = express.Router();

router.get("/:id", getTeamList);
router.get('/:id/p', getUserInfo);
//router.get('/:id/m',getMatchingList);
//router.patch('/:id/update',updateUserInfo);
module.exports = router;

