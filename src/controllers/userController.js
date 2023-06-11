const router = require("express").Router();

const userService = require("../services/usersService.js");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  await userService.register({ username, password, repeatPassword });

  res.redirect("/users/login");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userService.login(username, password);

  console.log(user);

  res.redirect("/");
});

module.exports = router;
