const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  hash: { type: String, required: true },
  categories: { type: Array },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
