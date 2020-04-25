const bcrypt = require("bcrypt");

const { User } = require("../models/User");

const getUser = (req, res, next) => {
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

const signup = (req, res) => {
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
      res.end();
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).end();
    });
};

const addCategory = (req, res) => {
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
};

const deleteCategory = (req, res) => {
  console.log("Deleting...", { target: req.body.target });

  const categories = req.userDoc.categories;
  const idx = categories.indexOf(req.body.target);
  if (idx > -1) {
    categories.splice(idx, 1);
  }
  req.userDoc.save();
  res.send({ updatedCategories: req.userDoc.categories });
};

module.exports = { getUser, signup, addCategory, deleteCategory };
