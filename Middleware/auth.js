const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware function for authenticating user requests
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    // Return a 401 status code and a message if the token is missing
    return res.status(401).json({ msg: "Please log in first" });
  }

  try {
    // Verify the JWT token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      // Attach user information to the request for later use
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      next(); // Continue with the next middleware or route handler
    } else {
      // Return a 401 status code if the token is invalid
      return res.status(401).json({ msg: "Please log in first" });
    }
  } catch (error) {
    // Return a 401 status code if there's an error during token verification
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = { authenticateUser };
