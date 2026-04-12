const pool = require("../db/db");

// ✅ GET ALL ASSETS
const getPortfolio = async (req, res) => {
  try {
    // ✅ AUTH CHECK (IMPORTANT)
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "SELECT * FROM portfolio WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows || []); // ✅ safe response
  } catch (err) {
    console.error("GET PORTFOLIO ERROR:", err.message);
    res.status(500).json({ message: "Error fetching portfolio" });
  }
};

// ✅ ADD ASSET
const addAsset = async (req, res) => {
  try {
    // ✅ AUTH CHECK
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, type, value, sector } = req.body;

    // ✅ BASIC VALIDATION (no feature removed)
    if (!name || !type || !value) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO portfolio (user_id, asset_name, type, sector, value)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, name, type, sector || "", value]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("ADD ASSET ERROR:", err.message);
    res.status(500).json({ message: "Error adding asset" });
  }
};

// ✅ DELETE ASSET
const deleteAsset = async (req, res) => {
  try {
    // ✅ AUTH CHECK
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Asset ID required" });
    }

    await pool.query(
      "DELETE FROM portfolio WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ASSET ERROR:", err.message);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getPortfolio,
  addAsset,
  deleteAsset,
};