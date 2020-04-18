const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");

const config = require("./config/index");
const middleware = require("./middlewares/authMiddleware");
const expenses = require("./models/Expense");
const categories = require("./models/Category");

const app = express();
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/expenses/:user", middleware.checkToken, (req, res) => {
  // console.log("retrieving expenses from DB...", {
  //   user: req.params.user,
  //   expenses: expenses[req.params.user],
  // });
  res.json(expenses[req.params.user]);
});

app.get("/categories", middleware.checkToken, (req, res) => {
  res.json(categories);
});

app.post("/login", (req, res) => {
  // TODO Search in DB/filesystem
  const mockedUsername = "gc";
  const mockedPassword = "n";
  const mockedUsername2 = "k";
  const mockedPassword2 = "n";

  const username = req.body.username;
  const userPassword = req.body.password;

  // console.log({ username, userPassword });

  if (username && userPassword) {
    if (
      (username === mockedUsername && userPassword === mockedPassword) ||
      (username === mockedUsername2 && userPassword === mockedPassword2)
    ) {
      const token = jwt.sign({ username }, config.secret, {
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
      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Authentication failed! Please, please check the request",
    });
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/src/index.js"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
