const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors()); // keep simple (your old way is fine)
app.use(express.json());

// ✅ Routes (no change needed)
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const goalRoutes = require("./routes/goalRoutes");
const plannerRoutes = require("./routes/plannerRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ❌ 404 handler (keep it LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❌ Error handler (must have next)
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message); // small improvement
  res.status(500).json({ message: "Something went wrong" });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});