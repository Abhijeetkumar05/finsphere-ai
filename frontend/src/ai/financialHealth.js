export function calculateFinancialHealth({ income, expenses, savings, investments }) {
  const savingsRatio = savings / income;
  const investmentRatio = investments / income;
  const expenseRatio = expenses / income;

  let score = 0;

  if (savingsRatio > 0.2) score += 40;
  else if (savingsRatio > 0.1) score += 25;

  if (investmentRatio > 0.15) score += 30;
  else if (investmentRatio > 0.05) score += 15;

  if (expenseRatio < 0.7) score += 30;
  else if (expenseRatio < 0.85) score += 15;

  return Math.min(score, 100);
}