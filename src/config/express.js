const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

function expressConfig(app) {
  app.use(express.static(path.resolve(__dirname, "../static")));
  app.use(express.urlencoded({ extended: false }));
}

module.exports = expressConfig;
