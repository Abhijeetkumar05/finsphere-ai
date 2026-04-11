import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ data = [] }) {

  // 🔄 Convert backend category data → chart format
  const chartData = data.map((item, index) => ({
    name: item.category || `C${index + 1}`,
    amount: Number(item.total || 0),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-80">
      <div className="font-semibold mb-3">Expense Trend</div>

      {chartData.length === 0 ? (
        <div className="text-gray-400 text-center mt-20">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}