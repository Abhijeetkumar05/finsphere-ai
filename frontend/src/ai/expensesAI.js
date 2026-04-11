export function analyzeExpenses(expenses) {
  const insights = [];

  if (!expenses.length) return insights;

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const byCategory = {};
  const byTitle = {};
  const byMonth = {};

  expenses.forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    byTitle[e.title] = (byTitle[e.title] || 0) + 1;
    byMonth[e.month] = (byMonth[e.month] || 0) + e.amount;
  });

  // Overspending detection
  const topCat = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  if (topCat && topCat[1] / total > 0.35) {
    insights.push({
      type: "warning",
      text: `High spending detected in ${topCat[0]} (${Math.round(
        (topCat[1] / total) * 100
      )}%)`,
    });
  }

  // Recurring detection
  Object.entries(byTitle).forEach(([title, count]) => {
    if (count >= 3) {
      insights.push({
        type: "info",
        text: `${title} appears to be recurring`,
      });
    }
  });

  // Forecast
  const months = Object.values(byMonth);
  if (months.length >= 3) {
    const avg = months.reduce((a, b) => a + b, 0) / months.length;
    insights.push({
      type: "forecast",
      text: `Predicted next month spending: ₹${Math.round(avg)}`,
    });
  }

  return insights;
}

export function budgetStatus(total, budget = 20000) {
  const ratio = total / budget;

  return {
    percent: Math.min(100, Math.round(ratio * 100)),
    status: ratio < 0.7 ? "safe" : ratio < 1 ? "warning" : "danger",
  };
}