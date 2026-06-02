const jwt = require("jsonwebtoken");

//  Token verify
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //  yaha user attach ho raha hai
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

//  Admin check
const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, checkAdmin };