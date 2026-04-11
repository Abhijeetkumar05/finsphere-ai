import { Wallet, TrendingUp, PiggyBank, Landmark } from "lucide-react";

export default function KPICards({ total, monthly, savings, investments }) {
  const cards = [
    {
      title: "Total Balance",
      value: total,
      icon: <Wallet />,
      color: "bg-indigo-600",
    },
    {
      title: "Monthly Spend",
      value: monthly,
      icon: <TrendingUp />,
      color: "bg-rose-500",
    },
    {
      title: "Savings",
      value: savings,
      icon: <PiggyBank />,
      color: "bg-emerald-500",
    },
    {
      title: "Investments",
      value: investments,
      icon: <Landmark />,
      color: "bg-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center"
        >
          <div>
            <div className="text-slate-500 text-sm">{c.title}</div>
            <div className="text-2xl font-bold mt-1">
              ₹{Number(c.value || 0).toLocaleString()}
            </div>
          </div>

          <div
            className={`w-12 h-12 rounded-xl ${c.color} text-white flex items-center justify-center`}
          >
            {c.icon}
          </div>
        </div>
      ))}
    </div>
  );
}