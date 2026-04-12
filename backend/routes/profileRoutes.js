const express = require("express");
const router = express.Router();

const {
  getProfile,
  saveProfile,
  deleteProfile,
} = require("../controllers/profileController");

const auth = require("../middleware/authMiddleware");

// =========================
// PROFILE ROUTES
// =========================

// GET → fetch profile
router.get("/", auth, getProfile);

// POST → create/update profile
router.post("/", auth, saveProfile);

// DELETE → remove profile
router.delete("/", auth, deleteProfile);

module.exports = router;