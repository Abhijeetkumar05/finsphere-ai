const pool = require("../db/db");

// 📌 GET ALL GOALS
const getGoals = async (req, res) => {
  try {
    // ✅ AUTH CHECK
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows || []);
  } catch (err) {
    console.error("GET GOALS ERROR:", err.message);
    res.status(500).json({ message: "Error fetching goals" });
  }
};

// ➕ ADD GOAL
const addGoal = async (req, res) => {
  try {
    // ✅ AUTH CHECK
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, target, saved, deadline, type } = req.body;

    // ✅ BASIC VALIDATION
    if (!name || !target) {
      return res.status(400).json({ message: "Name and target required" });
    }

    const result = await pool.query(
      `INSERT INTO goals (user_id, name, target, saved, deadline, type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        req.user.id,
        name,
        target,
        saved || 0,
        deadline || null,
        type || "General",
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("ADD GOAL ERROR:", err.message);
    res.status(500).json({ message: "Error adding goal" });
  }
};

// ❌ DELETE GOAL
const deleteGoal = async (req, res) => {
  try {
    // ✅ AUTH CHECK
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Goal ID required" });
    }

    await pool.query(
      "DELETE FROM goals WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    res.json({ message: "Goal deleted" });
  } catch (err) {
    console.error("DELETE GOAL ERROR:", err.message);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getGoals,
  addGoal,
  deleteGoal,
};