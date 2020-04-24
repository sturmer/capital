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
      req.userId = userDoc._id;
      req.hashedPassword = userDoc.hash;
      req.userName = userDoc.username;
      req.categories = userDoc.categories;
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

module.exports = { execute };
