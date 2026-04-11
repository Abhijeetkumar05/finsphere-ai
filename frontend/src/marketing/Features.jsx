import { Link } from "react-router-dom";
import { Brain, Target, Wallet, PieChart } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header */}
      <div className="px-12 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Powerful Financial Features
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          FinSphere AI combines budgeting, investing, and goal planning into
          one intelligent platform — just like top global fintech apps.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-12 pb-20">
        <Feature
          icon={<Wallet />}
          title="Smart Expense Tracking"
          text="Automatically categorize and analyze your spending patterns."
        />
        <Feature
          icon={<PieChart />}
          title="Portfolio Insights"
          text="Track investments and asset allocation in real time."
        />
        <Feature
          icon={<Target />}
          title="Goal Planning"
          text="Plan savings goals like house, car, or retirement."
        />
        <Feature
          icon={<Brain />}
          title="AI Financial Advisor"
          text="AI recommendations based on your salary and behavior."
        />
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <Link
          to="/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Start Planning Free
        </Link>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  );
}