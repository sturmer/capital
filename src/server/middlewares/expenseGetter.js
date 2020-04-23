const moment = require("moment");

const { Expense } = require("../models/Expense");
const { User } = require("../models/User");

const execute = (req, res, next) => {
  User.findOne({ username: req.params.user }) // TODO Can get it from the headers and do without the /:user
    .then((userDoc) => {
      Expense.find({ user: userDoc._id })
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
          // FIXME There's some repeated code!
          console.error(err);
          return res.status(400).end();
        });
    })
    .catch((userError) => {
      console.error(userError);
      return res.status(400).end();
    });
};

module.exports = { execute };
