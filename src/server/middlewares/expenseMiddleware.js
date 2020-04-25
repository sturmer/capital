const moment = require("moment");

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

const get = (req, res, next) => {
  // console.log({ userId: req.userId });
  Expense.find({ user: req.userId })
    .then((docs) => {
      // console.log({ docs });
      const result = docs
        .map((doc) => {
          return {
            id: doc._id,
            date: moment(doc.date).format("YYYY-MM-DD"),
            amount: doc.amount.toString(),
            category: doc.category,
            toFrom: doc.toFrom,
            description: doc.description,
          };
        })
        .sort((a, b) => {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });

      // console.log({ result });
      req.result = result;
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
};

module.exports = { add, get };
