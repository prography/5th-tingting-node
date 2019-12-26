const api = require("../routes/index");
const bodyParser = require("body-parser");
const config = require("../config");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const passportConfig = require("../middlewares/passport/passportConfig");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const expressLoader = app => {
    app.set("port", config.PORT);
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use("/api", api);
};

module.exports = expressLoader;
