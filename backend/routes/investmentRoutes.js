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

// =========================
// INVESTMENT ROUTES
// =========================

// ✅ SUMMARY (must be before "/")
router.get("/summary", authMiddleware, getSummary);

// ✅ GET ALL INVESTMENTS
router.get("/", authMiddleware, getInvestments);

// ✅ ADD INVESTMENT
router.post("/", authMiddleware, addInvestment);

// ✅ UPDATE INVESTMENT
router.put("/:id", authMiddleware, updateInvestment);

// ✅ DELETE INVESTMENT
router.delete("/:id", authMiddleware, deleteInvestment);

module.exports = router;