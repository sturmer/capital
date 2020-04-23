const moment = require("moment");

const { Expense } = require("../models/Expense");

const execute = (req, res, next) => {
  console.log({ userId: req.userId });
  Expense.find({ user: req.userId })
    .then((docs) => {
      // console.log({ docs });
      const result = docs.map((doc) => {
        return {
          id: doc._id,
          date: moment(doc.date).format("YYYY-MM-DD"),
          amount: doc.amount.toString(),
          category: doc.category,
          toFrom: doc.toFrom,
          description: doc.description,
        };
      });
      req.result = result;
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
};

module.exports = { execute };
