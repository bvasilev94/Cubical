const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [5, "Username must be longer than 5 characters"],
    match: [/^[A-Za-z0-9]+$/, "Username must include only letters and numbers"],
    unique: [true, "Username is already taken"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be longer than 8 characters"],
    match: [/^[A-Za-z0-9]+$/, "Password must incluce only letters and numbers"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError("Passwords do not match!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
