const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [5, "Cube name must be atleast 5 characters long"],
    match: [
      /^[A-Za-z0-9 ']+$/,
      "Cube name must include only letters and numbers",
    ],
  },
  description: {
    type: String,
    minLength: [20, "Cube description must be atleast 20 characters long"],
    match: [
      /^[A-Za-z0-9 ']+$/,
      "Cube description must include only letters and numbers",
    ],
  },
  imageUrl: {
    type: String,
    match: [/^https?:\/\//, "Invalid imageUrl"],
  },
  difficultyLvl: Number,
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
