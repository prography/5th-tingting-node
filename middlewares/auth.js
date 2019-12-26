const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(403).send("로그인 필요");
    }
};
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const {
            user: { id }
        } = req.user;
        res.redirect(`/users/${id}`);
    }
};

module.exports = {
    isLoggedIn,
    isNotLoggedIn
};
