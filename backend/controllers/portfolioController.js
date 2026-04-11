const pool = require("../db/db");

// ✅ GET ALL ASSETS
const getPortfolio = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM portfolio WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching portfolio" });
  }
};

// ✅ ADD ASSET
const addAsset = async (req, res) => {
  try {
    const { name, type, value, sector } = req.body;

    const result = await pool.query(
      `INSERT INTO portfolio (user_id, asset_name, type, sector, value)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, name, type, sector, value]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding asset" });
  }
};

// ✅ DELETE ASSET
const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM portfolio WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getPortfolio,
  addAsset,
  deleteAsset,
};