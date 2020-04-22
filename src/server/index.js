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

app.get("/expenses/:user/total", middleware.checkToken, (req, res) => {
  console.log({ user: req.params.user });
  User.findOne({ username: req.params.user })
    .then((userDoc) => {
      console.log({ userDoc });
      Expense.find({ user: userDoc._id })
        .then((docs) => {
          console.log({ docs });
          const totalByCategory = {};
          let total = 0;
          docs.forEach((doc) => {
            totalByCategory[doc.category] += Number(doc.amount);
            total += Number(doc.amount);
          });
          console.log({ total, totalByCategory });
          return res.send({ total, totalByCategory });
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
});

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
              amount: doc.amount.toString(),
              category: doc.category,
              toFrom: doc.toFrom,
              description: doc.description,
            };
          });

          // TODO Just use res.send(result) and remove the useless conversions downstream
          return res.json(result);
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
          return res.status(400).end();
        });
    })

    .catch((userFindErr) => {
      console.error(userFindErr);
      return res.status(400).end();
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
      return res.status(400).end();
    });
});

app
  .route("/categories/:user")
  .get(middleware.checkToken, (req, res) => {
    User.findOne({ username: req.params.user })
      .then((doc) => {
        console.log({ doc });
        return res.json(doc.categories);
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).end();
      });
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
  .delete(middleware.checkToken, (req, res) => {
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
        return res.status(400).end();
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
      return res.end();
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/src/index.js"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
