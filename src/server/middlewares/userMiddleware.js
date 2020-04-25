const bcrypt = require("bcrypt");

const { User } = require("../models/User");

const execute = (req, res, next) => {
  User.findOne({ username: req.params.user })
    .then((userDoc) => {
      if (!userDoc) {
        return res.send({
          success: false,
          message: "error retrieving user",
        });
      }
      console.log({ userDoc });
      // TODO Just return the whole userDoc instead of the single pieces... and the userDoc :)
      req.userId = userDoc._id;
      req.hashedPassword = userDoc.hash;
      req.userName = userDoc.username;
      req.categories = userDoc.categories;
      req.userDoc = userDoc;
      next();
    })
    .catch((userError) => {
      console.error(userError);
      return res.send({
        success: false,
        message: "error retrieving user data",
      });
    });
};

const signup = (req, res, next) => {
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
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
};

module.exports = { execute, signup };
