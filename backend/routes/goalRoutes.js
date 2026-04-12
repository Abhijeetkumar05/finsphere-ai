const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getGoals,
  addGoal,
  deleteGoal,
} = require("../controllers/goalController");

// =========================
// GOAL ROUTES
// =========================

// ✅ GET all goals
router.get("/", authMiddleware, getGoals);

// ✅ ADD new goal
router.post("/", authMiddleware, addGoal);

// ✅ DELETE goal
router.delete("/:id", authMiddleware, deleteGoal);

module.exports = router;