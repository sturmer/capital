const { Expense } = require("../models/Expense");
const { User } = require("../models/User");

const computeSummary = (req, res, next) => {
  User.findOne({ username: req.params.user })
    .then((userDoc) => {
      if (!userDoc) {
        return res.send({
          success: false,
          message: "error retrieving user",
        });
      }
      console.log({ userDoc });
      const totalsByCategory = new Map();
      userDoc.categories.forEach((cat) => {
        totalsByCategory.set(cat, 0);
      });
      totalsByCategory.set("Other", 0);
      Expense.find({ user: userDoc._id })
        .then((docs) => {
          let total = 0;

          docs.forEach((d) => {
            total += Number(d.amount);
            const category = d.category || "Other";
            // If the category is not part of the categories extracted from the userDoc,
            // then it's not in the categories collection.. TODO Add it here?
            const currentAmount = totalsByCategory.get(category);
            totalsByCategory.set(category, currentAmount + Number(d.amount));
          });

          const totalsByCategoryJson = {};
          totalsByCategory.forEach((v, k) => {
            totalsByCategoryJson[k] = v;
          });

          console.log({ totalsByCategoryJson });

          req.total = total;
          req.totalsByCategory = totalsByCategory;
          next();
        })
        .catch((err) => {
          // FIXME There's some repeated code!
          console.error(err);
          return res.send({
            success: false,
            message: "error retrieving expenses",
          });
        });
    })
    .catch((userError) => {
      console.error(userError);
      return res.send({
        success: false,
        message: "error retrieving user data",
      });
    });
};

module.exports = { computeSummary };
