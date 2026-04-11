const express = require("express");
const router = express.Router();

const {
  getProfile,
  saveProfile,
  deleteProfile,
} = require("../controllers/profileController");

const auth = require("../middleware/authMiddleware");

// ✅ Routes
router.get("/", auth, getProfile);
router.post("/", auth, saveProfile);
router.delete("/", auth, deleteProfile);

module.exports = router;