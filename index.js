console.log("hello world");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// ✅ CONNECT DB
connectDB();

// ✅ ALLOW BOTH LOCAL + NETLIFY
const allowedOrigins = [
  "http://localhost:5173",
  "https://url-shoortner.netlify.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/server-to-server
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ APPLY CORS
app.use(cors(corsOptions));

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ ROUTES
app.use("/api/url", require("./routes/urlRoutes"));

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
