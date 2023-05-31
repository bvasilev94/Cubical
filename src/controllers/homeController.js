const router = require("express").Router();
const cubeServices = require("../services/cubeService.js");

router.get("/", (req, res) => {
  const cubes = cubeServices.getAllCubes();
  res.render("index", { cubes });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
