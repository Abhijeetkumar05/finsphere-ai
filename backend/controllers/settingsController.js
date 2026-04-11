const pool = require("../db/db");

/* =========================
   FORMAT FUNCTION (REUSABLE)
========================= */
const formatSettings = (row) => {
  let accounts = [];

  try {
    accounts =
      typeof row.accounts === "string"
        ? JSON.parse(row.accounts)
        : row.accounts || [];
  } catch {
    accounts = [];
  }

  return {
    profile: {
      name: row.name || "",
      email: row.email || "",
      mobile: row.mobile || "",
    },
    security: {
      twoFA: row.twofa ?? false,
      biometric: row.biometric ?? false,
      autoLogout: row.autologout ?? false,
    },
    notifications: {
      email: row.email_alert ?? false,
      push: row.push_alert ?? false,
      spending: row.spending_alert ?? false,
      goals: row.goal_alert ?? false,
    },
    ai: {
      insights: row.ai_insights ?? false,
      categorize: row.ai_categorize ?? false,
      forecasts: row.ai_forecast ?? false,
    },
    appearance: {
      darkMode: row.dark_mode ?? false,
    },
    accounts,
  };
};

/* =========================
   DEFAULT SETTINGS (NO NULL)
========================= */
const defaultSettings = {
  profile: { name: "", email: "", mobile: "" },
  security: { twoFA: false, biometric: false, autoLogout: false },
  notifications: { email: false, push: false, spending: false, goals: false },
  ai: { insights: false, categorize: false, forecasts: false },
  appearance: { darkMode: false },
  accounts: [],
};

/* =========================
   GET SETTINGS
========================= */
const getSettings = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM settings WHERE user_id = $1",
      [req.user.id]
    );

    // ✅ NEVER RETURN NULL
    if (result.rows.length === 0) {
      return res.json(defaultSettings);
    }

    const formatted = formatSettings(result.rows[0]);

    res.json(formatted);
  } catch (err) {
    console.error("GET SETTINGS ERROR:", err);
    res.status(500).json({ message: "Error fetching settings" });
  }
};

/* =========================
   SAVE SETTINGS (UPSERT)
========================= */
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
        s.profile?.name ?? "",
        s.profile?.email ?? "",
        s.profile?.mobile ?? "",
        s.security?.twoFA ?? false,
        s.security?.biometric ?? false,
        s.security?.autoLogout ?? false,
        s.notifications?.email ?? false,
        s.notifications?.push ?? false,
        s.notifications?.spending ?? false,
        s.notifications?.goals ?? false,
        s.ai?.insights ?? false,
        s.ai?.categorize ?? false,
        s.ai?.forecasts ?? false,
        s.appearance?.darkMode ?? false,
        JSON.stringify(s.accounts ?? []),
      ]
    );

    // ✅ RETURN SAME FORMAT AS GET
    const formatted = formatSettings(result.rows[0]);

    res.json(formatted);
  } catch (err) {
    console.error("SAVE SETTINGS ERROR:", err);
    res.status(500).json({ message: "Error saving settings" });
  }
};

/* =========================
   DELETE SETTINGS
========================= */
const deleteSettings = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM settings WHERE user_id = $1",
      [req.user.id]
    );

    res.json({ message: "Settings deleted" });
  } catch (err) {
    console.error("DELETE SETTINGS ERROR:", err);
    res.status(500).json({ message: "Error deleting settings" });
  }
};

/* =========================
   EXPORT
========================= */
module.exports = {
  getSettings,
  saveSettings,
  deleteSettings,
};