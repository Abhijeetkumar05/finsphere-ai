const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getPortfolio,
  addAsset,
  deleteAsset,
} = require("../controllers/portfolioController");

// GET
router.get("/", authMiddleware, getPortfolio);

// ADD
router.post("/", authMiddleware, addAsset);

// DELETE
router.delete("/:id", authMiddleware, deleteAsset);

module.exports = router;