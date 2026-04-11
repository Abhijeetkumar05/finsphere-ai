const pool = require("../db/db");

// ✅ GET EXPENSES (WITH DATE FILTER)
const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    let query = "SELECT * FROM expenses WHERE user_id = $1";
    let values = [userId];

    if (date) {
      query += " AND DATE(created_at) = $2";
      values.push(date);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// ✅ ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, amount } = req.body;

    const result = await pool.query(
      "INSERT INTO expenses (user_id, title, category, amount) VALUES ($1,$2,$3,$4) RETURNING *",
      [userId, title, category, amount]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding expense" });
  }
};

// ✅ DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM expenses WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
};