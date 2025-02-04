require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const regionRoutes = require("./routes/regionRoutes");
const ping = require("ping"); // Import the ping module
const xlsx = require("xlsx"); // Import xlsx for reading Excel files
const path = require("path");

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

// Function to read IPs from Excel sheets
function loadDevicesFromExcel() {
    const filePaths = [
        path.join(__dirname, "data", "ArchiverData.xlsx"),
        path.join(__dirname, "data", "CameraData.xlsx"),
        path.join(__dirname, "data", "ControllerData.xlsx"),
        path.join(__dirname, "data", "ServerData.xlsx")
    ];
    
    let deviceIPs = [];

    filePaths.forEach((filePath) => {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

            data.forEach((row) => {
                if (row.Ip_address) { // Using "Ip_address" column
                    deviceIPs.push(row.Ip_address); 
                }
            });
        } catch (error) {
            console.error(`Error loading file: ${filePath}`, error);
        }
    });

    return deviceIPs;
}

// Load devices dynamically from Excel
let devices = loadDevicesFromExcel();
console.log(`Loaded ${devices.length} devices from Excel.`);

let deviceStatus = {};

// Function to continuously ping all devices
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
const devices = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]; // Add your device IPs here
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











require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const regionRoutes = require("./routes/regionRoutes");

const app = express();
const PORT = process.env.PORT || 80;


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


