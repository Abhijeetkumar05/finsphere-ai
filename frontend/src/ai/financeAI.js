import { analyzeSpendingTrend } from "./spendingAI";
import { goalForecast } from "./goalAI";
import { investmentAdvice } from "./investmentAI";
import { calculateFinancialHealth } from "./financialHealth";

export function generateFinanceAI({
  income,
  savings,
  expenses,
  goals,
  investments,
}) {
  const insights = [];

  /* ---------- SPENDING ---------- */
  const spend = analyzeSpendingTrend(expenses, income);
  if (spend) insights.push(spend);

  /* ---------- GOALS ---------- */
  const goal = goalForecast(goals, savings);
  if (goal) insights.push(goal);

  /* ---------- INVESTMENTS ---------- */
  const invest = investmentAdvice(investments, income);
  if (invest) insights.push(invest);

  /* ---------- HEALTH SCORE ---------- */
  const health = calculateFinancialHealth({
    income,
    savings,
    expenses,
    investments,
  });

  insights.push({
    title: "Financial Health Score",
    value: `${health}%`,
    desc:
      health > 80
        ? "Excellent financial stability"
        : health > 60
        ? "Good financial health"
        : "Needs improvement",
    color: "from-indigo-500 to-purple-500",
  });

  return insights;
}