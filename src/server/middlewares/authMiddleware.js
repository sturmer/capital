const jwt = require("jsonwebtoken");

const config = require("../config");

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

  if (token) {
    console.log({ middleware: "authMiddleware", token, secret: config.secret });
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = {
  checkToken,
};
