const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

// Create an Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", userRoutes); // Mount user routes

// Define a default route
app.get("/", (req, res) => {
  res.send("Welcome to the User Authentication API");
});

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
