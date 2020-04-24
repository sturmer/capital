const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const middleware = require("./middlewares/authMiddleware");
const summaryMiddleware = require("./middlewares/summaryMiddleware");
const expenseGetter = require("./middlewares/expenseGetter");
const userGetter = require("./middlewares/userGetter");
const expenseAdder = require("./middlewares/expenseAdder");
const loginMiddleware = require("./middlewares/loginMiddleware");
const { Expense } = require("./models/Expense");
const { User } = require("./models/User");

dotenv.config();
require("./database");

const app = express();
app.use(express.json());

app.get(
  "/expenses/:user/total",
  [
    middleware.checkToken,
    userGetter.execute,
    expenseGetter.execute,
    summaryMiddleware.computeSummary,
  ],
  (req, res) => {
    res.send({
      total: req.total,
      totalsByCategory: req.totalsByCategory,
      totalsByMonth: req.totalsByMonth,
    });
  }
);

// TODO Switch to GraphQL
app
  .route("/expenses/:user")
  .get(
    [middleware.checkToken, userGetter.execute, expenseGetter.execute],
    (req, res) => {
      return res.send(req.result);
    }
  )

  .post(
    [middleware.checkToken, userGetter.execute, expenseAdder.add],
    (req, res) => {
      res.send({ expenseId: req.expenseId });
    }
  );

app.delete("/expenses/:expenseId", middleware.checkToken, (req, res) => {
  // console.log(`deleting ${req.params.expenseId}`);
  Expense.findByIdAndDelete(req.params.expenseId)
    .then((expense) => {
      console.log("deleted", { expense });
      return res.json({});
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
});

app
  .route("/categories/:user")
  .get([middleware.checkToken, userGetter.execute], (req, res) => {
    res.send(req.categories);
  })
  .post(middleware.checkToken, (req, res) => {
    console.log({ category: req.body.category, user: req.params.user });

    User.updateOne(
      { username: req.params.user },
      { $push: { categories: req.body.category } }
    )
      .then((result) => {
        console.log({ result });

        // It should be equivalent to do: User.findOne, and then on the result: result.push(category), result.save();
        // Would that be less efficient?

        return res.end();
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).end();
      });
  })
  .delete([middleware.checkToken, userGetter.execute], (req, res) => {
    console.log("Deleting...", { target: req.body.target });

    const categories = req.userDoc.categories;
    const idx = categories.indexOf(req.body.target);
    if (idx > -1) {
      categories.splice(idx, 1);
    }
    req.userDoc.save();
    res.send({ updatedCategories: req.userDoc.categories });
  });

app.post(
  "/login/:user",
  [userGetter.execute, loginMiddleware.login],
  (req, res) => {
    console.log({ token: req.token });
    res.send({ token: req.token });
  }
);

app.post("/signup", userGetter.signup, (req, res) => {
  res.end();
});

// Serve the static files from the React app when in production
const publicPath = path.join(
  __dirname,
  "..",
  "..",
  process.env.NODE_ENV === "production" ? "build" : "public"
);
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
