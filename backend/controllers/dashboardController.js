const pool = require("../db/db");

exports.getDashboard = async (req, res) => {
  try {
    // ✅ SAFETY CHECK (IMPORTANT)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user.id;

    console.log("🔥 USER ID:", userId);

    // =========================
    // TOTAL EXPENSES
    // =========================
    const totalRes = await pool.query(
      `SELECT COALESCE(SUM(amount),0) AS total 
       FROM expenses WHERE user_id=$1`,
      [userId]
    );

    // =========================
    // MONTHLY EXPENSES
    // =========================
    const monthlyRes = await pool.query(
      `SELECT COALESCE(SUM(amount),0) AS monthly 
       FROM expenses 
       WHERE user_id=$1 
       AND DATE_TRUNC('month', created_at)=DATE_TRUNC('month', CURRENT_DATE)`,
      [userId]
    );

    // =========================
    // CATEGORY DATA
    // =========================
    const categoryRes = await pool.query(
      `SELECT category, COALESCE(SUM(amount),0) AS total 
       FROM expenses 
       WHERE user_id=$1 
       GROUP BY category`,
      [userId]
    );

    // =========================
    // RECENT TRANSACTIONS
    // =========================
    const recentRes = await pool.query(
      `SELECT id, title, amount, category, created_at 
       FROM expenses 
       WHERE user_id=$1 
       ORDER BY created_at DESC LIMIT 5`,
      [userId]
    );

    // =========================
    // PORTFOLIO
    // =========================
    const portfolioRes = await pool.query(
      `SELECT COALESCE(SUM(value),0) AS total 
       FROM portfolio WHERE user_id=$1`,
      [userId]
    );

    // =========================
    // INVESTMENTS
    // =========================
    const investmentRes = await pool.query(
      `SELECT COALESCE(SUM(current),0) AS total 
       FROM investments WHERE user_id=$1`,
      [userId]
    );

    const response = {
      total: Number(totalRes.rows[0].total),
      monthly: Number(monthlyRes.rows[0].monthly),
      categories: categoryRes.rows,
      recent: recentRes.rows,
      portfolio: Number(portfolioRes.rows[0].total),
      investments: Number(investmentRes.rows[0].total),
    };

    console.log("✅ DASHBOARD:", response);

    res.json(response);

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};