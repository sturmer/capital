// const expenses = {
//   gc: [
//     {
//       id: 1,
//       date: "2020-03-02",
//       amount: "-13.50",
//       category: "Utilities",
//       toFrom: "Tele2",
//       description: "Phone bill",
//     },
//     {
//       id: 2,
//       date: "2020-03-04",
//       amount: "21",
//       category: "Food Delivery",
//       toFrom: "Wolt",
//       description: "Indian dinner",
//     },
//     {
//       id: 3,
//       date: "2020-03-04",
//       amount: "51.30",
//       category: "Charity",
//       toFrom: "WWF",
//       description: "Monthly donation to WWF",
//     },
//   ],
//   kat: [
//     {
//       id: 4,
//       date: "2020-03-18",
//       amount: "151.30",
//       category: "Charity",
//       toFrom: "Pingu Farm",
//       description: "Donation to Pingu",
//     },
//   ],
// };
// module.exports = expenses;

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
