const router = require("express").Router();

const cubeService = require("../services/cubeService.js");
const accessoryService = require("../services/accessoryService.js");
const { changeDifficultyLevel } = require("../lib/viewHelpers.js");

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
    owner: req.user._id,
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cube = await cubeService.getOneCube(req.params.cubeId);

  if (!cube) {
    return res.redirect("/404");
  }

  let isOwner = false;
  if (req.user) {
    isOwner = cube.owner.toString() === req.user._id;
  }

  res.render("details", { cube, isOwner });
});

router.get("/:cubeId/add-accessory", async (req, res) => {
  const cube = await cubeService.getOneCube(req.params.cubeId);
  const accessories = await accessoryService.getAllAvailable(cube.accessories);

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { cube, accessories, hasAccessories });
});

router.post("/:cubeId/add-accessory", async (req, res) => {
  const { accessory: accessoryId } = req.body;
  const cubeId = req.params.cubeId;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/delete", async (req, res) => {
  const cube = await cubeService.getOneCube(req.params.cubeId);

  const options = changeDifficultyLevel(cube.difficultyLvl);

  res.render("delete", { cube, options });
});

router.post("/:cubeId/delete", async (req, res) => {
  await cubeService.delete(req.params.cubeId);

  res.redirect("/");
});

router.get("/:cubeId/edit", async (req, res) => {
  const cube = await cubeService.getOneCube(req.params.cubeId);

  const options = changeDifficultyLevel(cube.difficultyLvl);

  res.render("edit", { cube, options });
});

router.post("/:cubeId/edit", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeService.update(req.params.cubeId, {
    name,
    description,
    imageUrl,
    difficultyLvl: difficultyLevel,
  });

  res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;
