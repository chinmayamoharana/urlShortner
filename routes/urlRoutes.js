const express = require("express");
const Url = require("../models/url");
const shortid = require("shortid");

const router = express.Router();


// CREATE SHORT URL
router.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "URL required" });
    }

    const shortCode = shortid.generate();

    const newUrl = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET ALL URLS
router.get("/", async (req, res) => {
  const urls = await Url.find();
  res.json(urls);
});


// REDIRECT + INCREMENT COUNT
router.get("/:shortCode", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.originalUrl);
});

module.exports = router;
