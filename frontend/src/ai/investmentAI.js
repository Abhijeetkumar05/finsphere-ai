export function investmentAdvice(risk, savings) {
  if (risk === "low") return "Increase fixed income investments.";
  if (risk === "medium") return "Balanced portfolio recommended.";
  if (risk === "high") return "Consider equity exposure.";
}