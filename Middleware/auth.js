const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Please log in First" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (decoded) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      next();
    } else {
      return res.status(401).json({ msg: "Please log in First" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = { auth };
