export function generateInsights(data) {
  const insights = [];

  if (data.expenseGrowth > 15) {
    insights.push({
      title: "Spending Spike Detected",
      desc: "Your spending increased significantly this month.",
      type: "warning",
    });
  }

  if (data.savingsRatio < 0.2) {
    insights.push({
      title: "Savings Ratio Low",
      desc: "Savings below recommended 20% level.",
      type: "danger",
    });
  }

  if (data.investmentRatio < 0.15) {
    insights.push({
      title: "Investment Opportunity",
      desc: "You can safely increase SIP allocation.",
      type: "success",
    });
  }

  if (data.riskScore < 30) {
    insights.push({
      title: "Financial Stability Strong",
      desc: "Your financial risk is low.",
      type: "info",
    });
  }

  return insights;
}