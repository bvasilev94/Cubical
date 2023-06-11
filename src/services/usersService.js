const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const User = require("../models/User.js");

const SECRET = "sakd8dc12k09cj9asmv09j12v32103vkasjnv429";

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Wrong username or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Wrong username or password!");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });

  return token;
};
