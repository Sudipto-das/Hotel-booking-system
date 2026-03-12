const jwt = require("jsonwebtoken");

/**
 * @name authMiddleware
 * @description Verifies JWT token from request header
 * @usage Add to any protected route
 */
const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 2. Extract token (removes "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user payload to request
    req.user = decoded;

    next(); //  Move to the next handler

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = authMiddleware;