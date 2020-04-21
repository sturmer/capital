const jwt = require("jsonwebtoken");

const { secret } = require("../config/config.dev");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.json({
      success: false,
      message: "This route requires authentication",
    });
  }

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  console.log({ middleware: "authMiddleware", token, secret });
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("authentication problem...");
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        console.error("good to go!");
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = {
  checkToken,
};
