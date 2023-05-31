const router = require("express").Router();

const cubeManage = require("../services/cubeService.js");

router.get("/create", (req, res) => {
  console.log(cubeManage.getAllCubes());
  res.render("create");
});

router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  cubeManage.create(name, description, imageUrl, Number(difficultyLevel));

  res.redirect("/");
});

module.exports = router;
