const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getPortfolio,
  addAsset,
  deleteAsset,
} = require("../controllers/portfolioController");

// =========================
// PORTFOLIO ROUTES
// =========================

// GET → fetch all assets
router.get("/", authMiddleware, getPortfolio);

// POST → add new asset
router.post("/", authMiddleware, addAsset);

// DELETE → remove asset
router.delete("/:id", authMiddleware, deleteAsset);

module.exports = router;