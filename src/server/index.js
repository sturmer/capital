const express = require("express");
const path = require("path");

const app = express();

// TODO Use custom domain for Heroku app
// TODO Decide on DB (or just files in the beginning?) and store data in it
// TODO Put TODOs in one place...

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/expenses", (req, res) => {
  const storedExpenses = require("../data/expenses.json");
  res.json(storedExpenses);
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/index.js"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
