const api = require("../routes/index");
const bodyParser = require("body-parser");
const config = require("../config");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");

const expressLoader = app => {
    app.use(api);
    app.set("port", config.PORT);
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
};

module.exports = expressLoader;
