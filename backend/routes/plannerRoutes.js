const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getPlans,
  addPlan,
  deletePlan,
} = require("../controllers/plannerController");

// GET
router.get("/", authMiddleware, getPlans);

// POST (SAVE)
router.post("/", authMiddleware, addPlan);

// DELETE
router.delete("/:id", authMiddleware, deletePlan);

module.exports = router;