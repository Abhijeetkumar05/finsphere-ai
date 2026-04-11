const pool = require("../db/db");

// ✅ GET ALL PLANS
const getPlans = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM planners WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching plans" });
  }
};

// ➕ SAVE PLAN
const addPlan = async (req, res) => {
  try {
    const { type, data, mode } = req.body;

    const result = await pool.query(
      `INSERT INTO planners (user_id, type, data, mode)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, type, data, mode]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving plan" });
  }
};

// ❌ DELETE PLAN
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM planners WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getPlans,
  addPlan,
  deletePlan,
};