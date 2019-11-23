const express = require("express");
const { getTeamList } = require("../../../controllers/userController");
const { getUserInfo } = require("../../../controllers/userController");


const router = express.Router();

router.get("/:id", getTeamList);
//router.get('/:id/p', getUserInfo);

module.exports = router;

