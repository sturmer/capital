const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const middleware = require("./middlewares/authMiddleware");
const summaryMiddleware = require("./middlewares/summaryMiddleware");
const userMiddleware = require("./middlewares/userMiddleware");
const expenseMiddleware = require("./middlewares/expenseMiddleware");
const loginMiddleware = require("./middlewares/loginMiddleware");

dotenv.config();
require("./database");

const app = express();
app.use(express.json());

app.get(
  "/expenses/:user/total",
  [
    middleware.checkToken,
    userMiddleware.getUser,
    expenseMiddleware.get,
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
    [middleware.checkToken, userMiddleware.getUser, expenseMiddleware.get],
    (req, res) => {
      return res.send(req.result);
    }
  )
  .post(
    [middleware.checkToken, userMiddleware.getUser, expenseMiddleware.get],
    (req, res) => {
      res.send({ expenseId: req.expenseId });
    }
  );

app.delete("/expenses/:expenseId", [
  middleware.checkToken,
  expenseMiddleware.deleteExpense,
]);

app
  .route("/categories/:user")
  .get([middleware.checkToken, userMiddleware.getUser], (req, res) => {
    res.send(req.categories);
  })
  .post([middleware.checkToken, userMiddleware.addCategory])
  .delete([
    middleware.checkToken,
    userMiddleware.getUser,
    userMiddleware.deleteCategory,
  ]);

app.post(
  "/login/:user",
  [userMiddleware.getUser, loginMiddleware.login],
  (req, res) => {
    // console.log({ token: req.token });
    res.send({ token: req.token });
  }
);

app.post("/signup", userMiddleware.signup);

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
