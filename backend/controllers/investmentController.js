const pool = require("../db/db");

// ✅ GET ALL INVESTMENTS
const getInvestments = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "SELECT * FROM investments WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows || []);
  } catch (err) {
    console.error("GET INVESTMENTS ERROR:", err.message);
    res.status(500).json({ message: "Error fetching investments" });
  }
};

// ✅ ADD INVESTMENT
const addInvestment = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, type, amount, current } = req.body;

    // ✅ validation (no feature removed)
    if (!name || !amount || !current) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO investments (user_id, name, type, amount, current)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, name, type || "", amount, current]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("ADD INVESTMENT ERROR:", err.message);
    res.status(500).json({ message: "Error adding investment" });
  }
};

// ✅ DELETE INVESTMENT
const deleteInvestment = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Investment ID required" });
    }

    await pool.query(
      "DELETE FROM investments WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE INVESTMENT ERROR:", err.message);
    res.status(500).json({ message: "Delete failed" });
  }
};

// ✅ UPDATE
const updateInvestment = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { name, type, amount, current } = req.body;

    const result = await pool.query(
      `UPDATE investments
       SET name=$1, type=$2, amount=$3, current=$4
       WHERE id=$5 AND user_id=$6
       RETURNING *`,
      [name, type || "", amount, current, id, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE INVESTMENT ERROR:", err.message);
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ SUMMARY
const getSummary = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "SELECT amount, current FROM investments WHERE user_id=$1",
      [req.user.id]
    );

    let invested = 0;
    let current = 0;

    result.rows.forEach((r) => {
      invested += Number(r.amount || 0);
      current += Number(r.current || 0);
    });

    const profit = current - invested;
    const profitPct = invested
      ? ((profit / invested) * 100).toFixed(1)
      : 0;

    res.json({
      invested,
      current,
      profit,
      profitPct,
    });
  } catch (err) {
    console.error("SUMMARY ERROR:", err.message);
    res.status(500).json({ message: "Error getting summary" });
  }
};

module.exports = {
  getInvestments,
  addInvestment,
  deleteInvestment,
  updateInvestment,
  getSummary,
};