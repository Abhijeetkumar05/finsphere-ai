import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function PortfolioChart() {
  const data = [
    { name: "Stocks", value: 45 },
    { name: "Mutual Funds", value: 30 },
    { name: "FD", value: 15 },
    { name: "Crypto", value: 10 },
  ];

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-80">
      <div className="font-semibold mb-3">Investment Allocation</div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={90}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}