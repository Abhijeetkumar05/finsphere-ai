const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// ✅ GET
router.get("/", authMiddleware, getExpenses);

// ✅ ADD
router.post("/", authMiddleware, addExpense);

// ✅ DELETE
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;