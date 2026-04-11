export function analyzeSpendingTrend(data) {
  const last = data[data.length - 1];
  const prev = data[data.length - 2];

  const change = ((last - prev) / prev) * 100;

  if (change > 10) return "Your spending increased significantly.";
  if (change < -10) return "Good job! Spending decreased.";
  return "Spending stable.";
}
