const { Expense } = require("../models/Expense");

const computeSummary = (req, res, next) => {
  const userCategories = req.categories;
  const totalsByCategory = new Map();
  userCategories.forEach((cat) => {
    totalsByCategory.set(cat, 0);
  });
  totalsByCategory.set("Other", 0);

  const userId = req.userId;
  Expense.find({ user: userId })
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
      req.totalsByCategoryJson = totalsByCategoryJson;
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
};

module.exports = { computeSummary };
