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

app.get("/expenses", middleware.checkToken, (req, res) => {
  res.json(expenses);
});

app.get("/categories", middleware.checkToken, (req, res) => {
  res.json(categories);
});

app.post("/login", (req, res) => {
  // TODO Search in DB/filesystem
  const mockedUsername = "gc";
  const mockedPassword = "n";
  const username = req.body.username;
  const userPassword = req.body.password;

  console.log({ body: req.body });

  if (username && userPassword) {
    if (username === mockedUsername && userPassword === mockedPassword) {
      const token = jwt.sign({ username }, config.secret, {
        expiresIn: "24h", // expires in 24 hours
      });
      // return the JWT token for the future API calls
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
      message: "Authentication failed! Please check the request",
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
