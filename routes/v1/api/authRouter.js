const express = require("express");
const {
    signup,
    getLogin,
    postRegister,
    postLogin,
    postLogout
} = require("../../../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
// router.get("", getLogin);
// router.post("", postRegister);
// router.post("".postLogin);
// router.post("", postLogout);

module.exports = router;
