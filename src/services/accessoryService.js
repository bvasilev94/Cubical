const Accessory = require("../models/Accessory.js");

exports.getAll = () => Accessory.find().lean();
exports.create = (accessoryData) => Accessory.create(accessoryData);
exports.getAllAvailable = (accessoryIds) =>
  Accessory.find({ _id: { $nin: accessoryIds } }).lean();
