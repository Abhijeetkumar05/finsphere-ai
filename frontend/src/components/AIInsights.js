import { Brain, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { generateInsights } from "../ai/insightsAI";

export default function AllInsightsPage() {
  // Example user financial data
  const userData = {
    savingsRatio: 0.12,
    expenseGrowth: 18,
    investmentRatio: 0.08,
    riskScore: 25,
  };

  const insights = generateInsights(userData);

  const iconMap = {
    success: Brain,
    warning: TrendingUp,
    danger: AlertTriangle,
    info: ShieldCheck,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-800">
            AI Financial Insights
          </div>
          <div className="text-slate-500">
            Smart analysis of your financial behavior
          </div>
        </div>

        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow">
          AI Active
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-80">Financial Health Score</div>
            <div className="text-4xl font-bold mt-1">82%</div>
            <div className="text-xs opacity-80 mt-1">
              Excellent financial stability
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm opacity-80">Risk Level</div>
            <div className="text-xl font-semibold">Low</div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {insights.map((item, i) => {
          const Icon = iconMap[item.type];
          return <InsightCard key={i} {...item} icon={Icon} />;
        })}
      </div>
    </div>
  );
}

function InsightCard({ title, desc, type, icon: Icon }) {
  const colors = {
    success: "border-emerald-500 bg-emerald-50 text-emerald-700",
    warning: "border-amber-500 bg-amber-50 text-amber-700",
    danger: "border-red-500 bg-red-50 text-red-700",
    info: "border-indigo-500 bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg transition">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[type]}`}
        >
          <Icon size={20} />
        </div>

        <div className="flex-1">
          <div className="font-semibold text-slate-800">{title}</div>
          <div className="text-sm text-slate-500 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}