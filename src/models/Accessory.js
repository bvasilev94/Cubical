const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [5, "Accessory name must be atleast 5 characters long"],
    match: [
      /^[A-Za-z0-9 ']+$/,
      "Accessory name must include only letters and numbers",
    ],
  },
  description: {
    type: String,
    minLength: [20, "Accessory description must be atleast 20 characters long"],
    match: [
      /^[A-Za-z0-9 ']+$/,
      "Accessory description must include only letters and numbers",
    ],
  },
  imageUrl: {
    type: String,
    match: [/^https?:\/\//, "Invalid imageUrl"],
  },
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
