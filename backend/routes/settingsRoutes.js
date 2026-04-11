const express = require("express");
const router = express.Router();

const {
  getSettings,
  saveSettings,
  deleteSettings,
} = require("../controllers/settingsController");

const authMiddleware = require("../middleware/authMiddleware");

// ✅ GET
router.get("/", authMiddleware, getSettings);

// ✅ SAVE
router.post("/", authMiddleware, saveSettings);

// ✅ DELETE
router.delete("/", authMiddleware, deleteSettings);

module.exports = router;