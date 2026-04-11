const pool = require("../db/db");

const getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("USER ID:", userId);

    const [expensesRes, goalsRes, investmentsRes, portfolioRes] =
      await Promise.all([
        pool.query("SELECT * FROM expenses WHERE user_id=$1", [userId]),
        pool.query("SELECT * FROM goals WHERE user_id=$1", [userId]),
        pool.query("SELECT * FROM investments WHERE user_id=$1", [userId]),
        pool.query("SELECT * FROM portfolio WHERE user_id=$1", [userId]),
      ]);

    const expenses = expensesRes.rows;
    const goals = goalsRes.rows;
    const investments = investmentsRes.rows;
    const portfolio = portfolioRes.rows;

    // 🔥 TOTALS
    const totalExpense = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const totalInvestment = investments.reduce(
      (sum, i) => sum + Number(i.current || i.amount || 0),
      0
    );

    const totalPortfolio = portfolio.reduce(
      (sum, p) => sum + Number(p.value || 0),
      0
    );

    // 🔥 CATEGORY ANALYSIS
    const categoryTotals = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + Number(e.amount || 0);
    });

    const topCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // 🔥 AI INSIGHTS
    const insights = [];

    if (topCategory) {
      insights.push({
        title: "High Spending",
        desc: `You spend most on ${topCategory[0]}`,
      });
    }

    if (totalExpense > 30000) {
      insights.push({
        title: "Overspending Alert",
        desc: "Reduce your monthly expenses",
      });
    }

    if (totalInvestment > totalExpense) {
      insights.push({
        title: "Strong Financial Growth",
        desc: "Your investments are outperforming spending",
      });
    }

    if (goals.length === 0) {
      insights.push({
        title: "No Goals Set",
        desc: "Set financial goals to grow wealth",
      });
    }

    // 🔥 SCORE
    let score = 0;

    if (totalInvestment > 0) score += 25;
    if (goals.length > 0) score += 25;
    if (totalExpense < totalInvestment) score += 25;
    if (portfolio.length > 0) score += 25;

    res.json({
      insights,
      summary: {
        totalExpense,
        totalInvestment,
        totalPortfolio,
        expenseCount: expenses.length,
        goalCount: goals.length,
        score,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI error" });
  }
};

module.exports = { getInsights };