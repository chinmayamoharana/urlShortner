console.log("hello world");

const express = require("express");   // ✅ FIX 1
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
require("dotenv").config();

connectDB();

const corsOptions = {
  origin: "https://url-shoortner.netlify.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/url", require("./routes/urlRoutes")); // ✅ FIX 2

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
