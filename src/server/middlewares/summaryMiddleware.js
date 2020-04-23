const computeSummary = (req, res, next) => {
  const expenses = req.result;

  const userCategories = expenses.map((e) => e.category).filter((cat) => !!cat);
  const totalsByCategory = new Map();
  userCategories.forEach((cat) => {
    totalsByCategory.set(cat, 0);
  });
  totalsByCategory.set("Other", 0);

  let total = 0;

  expenses.forEach((d) => {
    total += Number(d.amount);
    const category = d.category || "Other";
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
};

module.exports = { computeSummary };
