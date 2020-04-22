const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");

const { secret } = require("./config/config.dev");
const middleware = require("./middlewares/authMiddleware");
const { Expense } = require("./models/Expense");
const { User } = require("./models/User");

require("./database");

const app = express();
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/expenses/:user", middleware.checkToken, (req, res) => {
  User.findOne({ username: req.params.user })
    .then((userDoc) => {
      Expense.find({ user: userDoc._id })
        .then((docs) => {
          // console.log({ docs });
          const result = docs.map((doc) => {
            return {
              id: doc._id,
              date: moment(doc.date).format("YYYY-MM-DD"),
              amount: doc.amount.$numberDecimal,
              category: doc.category,
              toFrom: doc.toFrom,
              description: doc.description,
            };
          });
          return res.json(result);
        })
        .catch((err) => {
          // FIXME There's some repeated code!
          console.error(err);
          return res.status(400);
        });
    })
    .catch((userError) => {
      console.error(userError);
      return res.status(400);
    });
});

// TODO Switch to GraphQL
app.post("/expenses", middleware.checkToken, (req, res) => {
  console.log("server: adding expense...", {
    expense: req.body.expense,
    user: req.body.user,
  });

  User.findOne({ username: req.body.user })
    .then((userDoc) => {
      // Can the user be non-existing? No, because we get it from the auth
      // state of the client component.
      const { amount, date, category, toFrom, description } = req.body.expense;
      const newExpense = new Expense({
        user: userDoc._id,
        category,
        date,
        amount,
        toFrom,
        description,
      });

      newExpense
        .save()
        .then((doc) => {
          // console.log("Created expense", { doc });
          return res.status(200).json({ expenseId: doc._id });
        })
        .catch((err) => {
          console.error(err);
          return res.status(400).json({});
        });
    })

    .catch((userFindErr) => {
      console.error(userFindErr);
      return res.status(400).json({});
    });
});

app.delete("/expenses/:expenseId", middleware.checkToken, (req, res) => {
  // console.log(`deleting ${req.params.expenseId}`);
  Expense.findByIdAndDelete(req.params.expenseId)
    .then((expense) => {
      console.log("deleted", { expense });
      return res.json({});
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({});
    });
});

app.get("/categories/:user", middleware.checkToken, (req, res) => {
  User.findOne({ username: req.params.user })
    .then((doc) => {
      console.log({ doc });
      return res.json(doc.categories);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });

  // res.json(categories[req.params.user]);
});

app.post("/categories/:user", middleware.checkToken, (req, res) => {
  console.log({ category: req.body.category, user: req.params.user });

  User.updateOne(
    { username: req.params.user },
    { $push: { categories: req.body.category } }
  )
    .then((result) => {
      console.log({ result });

      // It should be equivalent to do: User.findOne, and then on the result: result.push(category), result.save();
      // Would that be less efficient?

      return res.json({});
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({});
    });
});

app.delete("/categories/:user", middleware.checkToken, (req, res) => {
  console.log("Deleting...", { target: req.body.target });
  User.findOne({ username: req.params.user })
    .then((result) => {
      console.log({ result });
      const idx = result.categories.indexOf(req.body.target);
      if (idx > -1) {
        result.categories.splice(idx, 1);
      }
      result.save();
      return res.json({ updatedCategories: result.categories });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({});
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const clearTextPassword = req.body.password;

  console.log({ username, clearTextPassword });

  if (username && clearTextPassword) {
    User.findOne({ username })
      .then((doc) => {
        // console.log({ comment: "retrieved User", doc });

        if (bcrypt.compareSync(clearTextPassword, doc.hash)) {
          console.log("password correct");
          // Passwords match
          const token = jwt.sign({ username }, secret, {
            expiresIn: "24h", // expires in 24 hours
          });

          // Return the JWT token for the future API calls
          // console.log({ route: "/login", token });
          return res.json({
            success: true,
            message: "Authentication successful!",
            token,
            user: {
              firstName: "Admin",
              lastName: "User",
            },
          });
        } else {
          // Passwords don't match
          console.log("password wrong");
          return res.status(400).json({
            success: false,
            message: "Wrong password",
          });
        }
      })
      .catch((err) => {
        console.log("error in find()");
        return res.status(400).json({
          success: false,
          message: err,
        });
      });
  } else {
    return res.status(400).json({
      success: false,
      mesage: "Authentication failed! Please, please check the request",
    });
  }
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log({ username, password });

  // TODO be async or use promise
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, hash: hashedPassword });
  newUser
    .save()
    .then((doc) => {
      console.log({ doc });
      return res.status(200).json({});
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({});
    });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/src/index.js"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
