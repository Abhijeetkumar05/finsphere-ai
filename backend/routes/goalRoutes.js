const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getGoals,
  addGoal,
  deleteGoal,
} = require("../controllers/goalController");

// GET
router.get("/", authMiddleware, getGoals);

// POST
router.post("/", authMiddleware, addGoal);

// DELETE
router.delete("/:id", authMiddleware, deleteGoal);

module.exports = router;