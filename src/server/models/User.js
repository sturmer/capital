const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // "username" should probably be called "login".
    // Solve ambiguity username/e-mail
    // TODO Add currency, user first name (to be used in the logout button)
    username: { type: String, required: true, unique: false },
    hash: { type: String, required: true },
    categories: { type: Array },
  },
  { autoCreate: process.env.NODE_ENV === "development" }
);

console.log("environment", { env: process.env.NODE_ENV });

const User = mongoose.model("User", userSchema);
module.exports = { User };
