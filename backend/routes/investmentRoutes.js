const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getInvestments,
  addInvestment,
  deleteInvestment,
  updateInvestment,
  getSummary,
} = require("../controllers/investmentController");

// ⚠️ IMPORTANT ORDER
router.get("/summary", authMiddleware, getSummary);

// GET ALL
router.get("/", authMiddleware, getInvestments);

// ADD
router.post("/", authMiddleware, addInvestment);

// UPDATE
router.put("/:id", authMiddleware, updateInvestment);

// DELETE
router.delete("/:id", authMiddleware, deleteInvestment);

module.exports = router;