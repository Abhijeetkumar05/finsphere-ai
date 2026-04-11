export function goalForecast(target, saved, monthly) {
  const remaining = target - saved;
  const months = remaining / monthly;
  return Math.ceil(months);
}