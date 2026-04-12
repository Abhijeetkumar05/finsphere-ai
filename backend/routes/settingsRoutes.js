const express = require("express");
const router = express.Router();

const {
  getSettings,
  saveSettings,
  deleteSettings,
} = require("../controllers/settingsController");

const authMiddleware = require("../middleware/authMiddleware");

// =========================
// SETTINGS ROUTES
// =========================

// GET → fetch user settings
router.get("/", authMiddleware, getSettings);

// POST → save/update settings
router.post("/", authMiddleware, saveSettings);

// DELETE → delete user settings
router.delete("/", authMiddleware, deleteSettings);

module.exports = router;