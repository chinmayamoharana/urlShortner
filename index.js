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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://url-shoortner.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ ROUTES
app.use("/api/url", require("./routes/urlRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
