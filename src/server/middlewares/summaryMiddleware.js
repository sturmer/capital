const moment = require("moment");

const computeSummary = (req, res, next) => {
  const expenses = req.result;

  const userCategories = expenses.map((e) => e.category).filter((cat) => !!cat);
  console.log({ userCategories });

  const totalsByMonth = {};
  expenses.forEach((e) => {
    const monthWithYear = moment(e.date).format("MMMM YYYY");
    if (!(monthWithYear in totalsByMonth)) {
      totalsByMonth[`${monthWithYear}`] = 0;
    }
    totalsByMonth[`${monthWithYear}`] += Number(e.amount);
  });

  let total = 0;

  // TODO Use plain object also for totalsByCategory!
  const totalsByCategory = {};
  userCategories.forEach((cat) => {
    totalsByCategory[`${cat}`] = 0;
  });
  totalsByCategory["Other"] = 0;

  expenses.forEach((d) => {
    total += Number(d.amount);
    const category = d.category || "Other";
    totalsByCategory[`${category}`] += Number(d.amount);
  });

  console.log({ totalsByCategory });
  console.log({ totalsByMonth });

  req.total = total;
  req.totalsByCategory = totalsByCategory;
  req.totalsByMonth = totalsByMonth;
  next();
};

module.exports = { computeSummary };
