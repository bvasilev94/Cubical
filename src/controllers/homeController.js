const router = require("express").Router();
const cubeServices = require("../services/cubeService.js");

router.get("/", async (req, res) => {
  const {search, from, to} = req.query;
  
  const cubes = await cubeServices.getAllCubes(search, from, to);

  res.render("index", { cubes });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
