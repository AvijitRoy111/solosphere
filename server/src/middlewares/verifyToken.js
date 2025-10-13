const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).send({ message: "Unauthorized (no token)" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
