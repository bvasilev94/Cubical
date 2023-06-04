const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/cubical";

async function dbConnect() {
  await mongoose.connect(uri);
}

module.exports = dbConnect;
