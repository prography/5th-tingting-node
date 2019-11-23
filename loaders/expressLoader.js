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
    const env = config.NODE_ENV || "development";
    const db_config = config.DB_CONFIG[env];
    app.use(api);
    app.set("port", config.PORT);
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    passportConfig(passport);
    app.use(
        session({
            secret: config.SECRET_KEY,
            resave: false,
            saveUninitialized: true,
            store: new MySQLStore({
                host: db_config.host,
                port: db_config.port,
                user: db_config.username,
                password: db_config.password,
                database: db_config.database
            })
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = expressLoader;
