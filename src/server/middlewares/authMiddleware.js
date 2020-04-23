const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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

  // console.log({ middleware: "authMiddleware", token, secret });
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("authentication problem...");
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
