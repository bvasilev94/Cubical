const router = require("express").Router();

const userService = require("../services/usersService.js");
const { extractErrMessages } = require("../utils/errorHelper.js");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    await userService.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (error) {
    const errorMessages = extractErrMessages(error);
    res.status(404).render("auth/register", { errorMessages });
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await userService.login(username, password);

    res.cookie("auth", token, { httpOnly: true });

    res.redirect("/");
  } catch (error) {
    const errorMessages = ["Incorrect username or password"];
    res.status(404).render("auth/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
