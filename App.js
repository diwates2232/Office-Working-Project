require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const regionRoutes = require("./routes/regionRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Configure CORS correctly
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Match your frontend's origin
    methods: "GET,POST,PUT,DELETE", // Allow necessary HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
  })
);

app.use(bodyParser.json());

// Routes
app.use("/api/regions", regionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
