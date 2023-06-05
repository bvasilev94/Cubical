const router = require("express").Router();

const cubeManager = require("../services/cubeService.js");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLvl: Number(difficultyLevel),
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cube = await cubeManager.getOneCube(req.params.cubeId);

  if (!cube) {
    return res.redirect("/404");
  }

  res.render("details", { cube });
});

router.get("/:cubeId/add-accessory", async (req, res) => {
  const cube = await cubeManager.getOneCube(req.params.cubeId);

  res.render("accessory/attach", { cube });
});
module.exports = router;
