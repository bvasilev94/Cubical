const router = require("express").Router();

const cubeManage = require("../services/cubeService.js");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManage.create({
    name,
    description,
    imageUrl,
    difficultyLvl: Number(difficultyLevel),
  });

  res.redirect("/");
});

router.get("/details/:cubeId", (req, res) => {
  const cube = cubeManage.getOneCube(req.params.cubeId);

  if (!cube) {
    return res.redirect("/404");
  }

  res.render("details", { cube });
});
module.exports = router;
