const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/register", UserController.registerUser);

// Login an existing user
router.post("/login", UserController.loginUser);

// Protected route to access user profile
router.get("/profile", authenticateToken, UserController.getUserProfile);

// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
