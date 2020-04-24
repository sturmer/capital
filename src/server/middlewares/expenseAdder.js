const { Expense } = require("../models/Expense");

const add = (req, res, next) => {
  const userId = req.userId;

  // Can the user be non-existing? No, because we get it from the auth
  // state of the client component.
  const { amount, date, category, toFrom, description } = req.body.expense;
  const newExpense = new Expense({
    user: userId,
    category,
    date,
    amount,
    toFrom,
    description,
  });

  //   console.log({ newExpense });

  newExpense
    .save()
    .then((doc) => {
      // console.log("Created expense", { doc });
      req.expenseId = doc._id;
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
};

module.exports = { add };
