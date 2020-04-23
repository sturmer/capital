const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String, // TODO Must be one of user.categories (validate)
    date: { type: mongoose.Schema.Types.Date, required: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    toFrom: String,
    description: String,
  },
  { autoCreate: process.env.NODE_ENV === "dev" }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = { Expense };
