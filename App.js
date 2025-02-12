Latest Updated



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const regionRoutes = require("./routes/regionRoutes");
const ping = require("ping"); // Import the ping module

const app = express();
const PORT = process.env.PORT || 80;

const { fetchAllIpAddress } = require("./services/excelService");

// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Match your frontend's origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());

// Routes
app.use("/api/regions", regionRoutes);

// Ping a specific device dynamically
app.get("/api/ping/:ip", async (req, res) => {
  const ip = req.params.ip;
  
  try {
    const result = await ping.promise.probe(ip);
    res.json({ ip, status: result.alive ? "Online" : "Offline" });
  } catch (error) {
    console.error(`Ping error for ${ip}:`, error);
    res.json({ ip, status: "Offline" });
  }
});

// Function to continuously ping all devices
const devices = fetchAllIpAddress();
let deviceStatus = {};

async function pingDevices() {
  for (const ip of devices) {
    try {
      const result = await ping.promise.probe(ip);
      deviceStatus[ip] = result.alive ? "Online" : "Offline";
    } catch (error) {
      console.error(`Error pinging ${ip}:`, error);
      deviceStatus[ip] = "Offline";
    }
  }
  console.log("Updated device status:", deviceStatus);
}

// Ping devices every 30 seconds
setInterval(pingDevices, 120000);

// Get real-time status of all devices
app.get("/api/devices/status", (req, res) => {
  res.json(deviceStatus);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  pingDevices(); // Start pinging devices immediately
});




























require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const regionRoutes = require("./routes/regionRoutes");
const ping = require("ping"); // Import the ping module

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Match your frontend's origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());

// Routes
app.use("/api/regions", regionRoutes);

// Ping a specific device dynamically
app.get("/api/ping/:ip", async (req, res) => {
  const ip = req.params.ip;
  
  try {
    const result = await ping.promise.probe(ip);
    res.json({ ip, status: result.alive ? "Online" : "Offline" });
  } catch (error) {
    console.error(`Ping error for ${ip}:`, error);
    res.json({ ip, status: "Offline" });
  }
});

// Function to continuously ping all devices
const devices = ["10.58.118.20", "10.58.118.21", "10.199.22.61","10.130.36.56","10.64.10.50"]; // Add your device IPs here
let deviceStatus = {};

async function pingDevices() {
  for (const ip of devices) {
    try {
      const result = await ping.promise.probe(ip);
      deviceStatus[ip] = result.alive ? "Online" : "Offline";
    } catch (error) {
      console.error(`Error pinging ${ip}:`, error);
      deviceStatus[ip] = "Offline";
    }
  }
  console.log("Updated device status:", deviceStatus);
}

// Ping devices every 30 seconds
setInterval(pingDevices, 30000);

// Get real-time status of all devices
app.get("/api/devices/status", (req, res) => {
  res.json(deviceStatus);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  pingDevices(); // Start pinging devices immediately
});
