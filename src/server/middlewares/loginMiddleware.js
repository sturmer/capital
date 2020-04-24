const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  const username = req.userName;
  const clearTextPassword = req.body.password;

  //   console.log({ username, clearTextPassword });

  if (!username || !clearTextPassword) {
    return res.status(400).json({
      success: false,
      mesage: "Missing username/password",
    });
  }

  const hash = req.hashedPassword;
  //   console.log({ hash });
  if (!bcrypt.compareSync(clearTextPassword, hash)) {
    console.log("password wrong");
    return res.status(400).json({
      success: false,
      message: "Wrong password",
    });
  }

  console.log("password correct");
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "24h", // expires in 24 hours
  });

  // Return the JWT token for the future API calls
  req.token = token;
  next();
};

module.exports = { login };
