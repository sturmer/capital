const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { secret } = require("./config/config.dev");
const middleware = require("./middlewares/authMiddleware");
const expenses = require("./models/Expense");
const categories = require("./models/Category");
const { db } = require("./database");
const { User } = require("./models/User");

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

app.get("/categories/:user", middleware.checkToken, (req, res) => {
  res.json(categories[req.params.user]);
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const clearTextPassword = req.body.password;

  console.log({ username, clearTextPassword });

  if (username && clearTextPassword) {
    User.findOne({ username })
      .then((doc) => {
        console.log({ comment: "retrieved", doc });

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

// console.log({ username, userPassword });

// if (username && userPassword) {
//   if (
//     (username === mockedUsername && userPassword === mockedPassword) ||
//     (username === mockedUsername2 && userPassword === mockedPassword2)
//   ) {
//     const token = jwt.sign({ username }, config.secret, {
//       expiresIn: "24h", // expires in 24 hours
//     });
//     // Return the JWT token for the future API calls
//     // console.log({ route: "/login", token });
//     return res.json({
//       success: true,
//       message: "Authentication successful!",
//       token,
//       user: {
//         firstName: "Admin",
//         lastName: "User",
//       },
//     });
//   } else {
//     return res.status(401).json({
//       success: false,
//       message: "Incorrect username or password",
//     });
//   }
// } else {
//   return res.status(400).json({
//     success: false,
//     message: "Authentication failed! Please, please check the request",
//   });
// }

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
      console.log(doc);
      // FIXME For some reason this hangs forever when sending request
      // from Postman...
      return res.status(200);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/src/index.js"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
