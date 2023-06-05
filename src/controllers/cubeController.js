const router = require("express").Router();

const cubeService = require("../services/cubeService.js");
const accessoryService = require("../services/accessoryService.js");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLvl: Number(difficultyLevel),
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cube = await cubeService.getOneCube(req.params.cubeId);

  if (!cube) {
    return res.redirect("/404");
  }

  res.render("details", { cube });
});

router.get("/:cubeId/add-accessory", async (req, res) => {
  const cube = await cubeService.getOneCube(req.params.cubeId);
  const accessories = await accessoryService.getAll();

  const hasAccessories = accessories.length > 0

  res.render("accessory/attach", { cube, accessories, hasAccessories });
});
module.exports = router;
