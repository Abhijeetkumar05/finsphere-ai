const pool = require("../db/db");

/* =========================
   SETTINGS SECTION
========================= */

// ✅ GET SETTINGS
const getSettings = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM settings WHERE user_id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    const row = result.rows[0];

    const formatted = {
      profile: {
        name: row.name,
        email: row.email,
        mobile: row.mobile,
      },
      security: {
        twoFA: row.twofa,
        biometric: row.biometric,
        autoLogout: row.autologout,
      },
      notifications: {
        email: row.email_alert,
        push: row.push_alert,
        spending: row.spending_alert,
        goals: row.goal_alert,
      },
      ai: {
        insights: row.ai_insights,
        categorize: row.ai_categorize,
        forecasts: row.ai_forecast,
      },
      appearance: {
        darkMode: row.dark_mode,
      },
      accounts: row.accounts || [],
    };

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching settings" });
  }
};

// ✅ SAVE SETTINGS
const saveSettings = async (req, res) => {
  try {
    const s = req.body;

    const result = await pool.query(
      `
      INSERT INTO settings (
        user_id, name, email, mobile,
        twofa, biometric, autologout,
        email_alert, push_alert, spending_alert, goal_alert,
        ai_insights, ai_categorize, ai_forecast,
        dark_mode, accounts
      )
      VALUES (
        $1,$2,$3,$4,
        $5,$6,$7,
        $8,$9,$10,$11,
        $12,$13,$14,
        $15,$16
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        mobile = EXCLUDED.mobile,
        twofa = EXCLUDED.twofa,
        biometric = EXCLUDED.biometric,
        autologout = EXCLUDED.autologout,
        email_alert = EXCLUDED.email_alert,
        push_alert = EXCLUDED.push_alert,
        spending_alert = EXCLUDED.spending_alert,
        goal_alert = EXCLUDED.goal_alert,
        ai_insights = EXCLUDED.ai_insights,
        ai_categorize = EXCLUDED.ai_categorize,
        ai_forecast = EXCLUDED.ai_forecast,
        dark_mode = EXCLUDED.dark_mode,
        accounts = EXCLUDED.accounts
      RETURNING *;
      `,
      [
        req.user.id,
        s.profile.name,
        s.profile.email,
        s.profile.mobile,
        s.security.twoFA,
        s.security.biometric,
        s.security.autoLogout,
        s.notifications.email,
        s.notifications.push,
        s.notifications.spending,
        s.notifications.goals,
        s.ai.insights,
        s.ai.categorize,
        s.ai.forecasts,
        s.appearance.darkMode,
        JSON.stringify(s.accounts),
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving settings" });
  }
};

// ✅ DELETE SETTINGS
const deleteSettings = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM settings WHERE user_id = $1",
      [req.user.id]
    );

    res.json({ message: "Settings deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting settings" });
  }
};

/* =========================
   PROFILE SECTION
========================= */

// ✅ GET PROFILE
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM profile WHERE user_id = $1",
      [req.user.id]
    );

    res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// ✅ SAVE PROFILE
const saveProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      role,
      plan,
      avatar,
      occupation,
      location,
      bio,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO profile 
      (user_id, name, email, mobile, role, plan, avatar, occupation, location, bio)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (user_id)
      DO UPDATE SET
        name=$2,
        email=$3,
        mobile=$4,
        role=$5,
        plan=$6,
        avatar=$7,
        occupation=$8,
        location=$9,
        bio=$10
      RETURNING *;
      `,
      [
        req.user.id,
        name,
        email,
        mobile,
        role,
        plan,
        avatar,
        occupation,
        location,
        bio,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving profile" });
  }
};

// ✅ DELETE PROFILE
const deleteProfile = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM profile WHERE user_id = $1",
      [req.user.id]
    );

    res.json({ message: "Profile deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting profile" });
  }
};

/* =========================
   FINAL EXPORT (IMPORTANT)
========================= */

module.exports = {
  // settings
  getSettings,
  saveSettings,
  deleteSettings,

  // profile
  getProfile,
  saveProfile,
  deleteProfile,
};