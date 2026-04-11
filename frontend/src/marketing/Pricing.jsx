import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      
      {/* Header */}
      <div className="text-center px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Choose a plan that fits your financial journey. Upgrade anytime as your
          wealth grows.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 px-12 pb-20">
        <Plan
          name="Starter"
          price="Free"
          features={[
            "Expense Tracking",
            "Basic Budgeting",
            "Goal Planning",
            "Community Support",
          ]}
          button="Get Started"
        />

        <Plan
          name="Pro"
          price="₹199/mo"
          highlight
          features={[
            "Everything in Starter",
            "AI Insights",
            "Investment Tracking",
            "Advanced Analytics",
          ]}
          button="Start Free Trial"
        />

        <Plan
          name="Wealth"
          price="₹499/mo"
          features={[
            "Everything in Pro",
            "Financial Planning AI",
            "Priority Support",
            "Future Forecasting",
          ]}
          button="Upgrade Now"
        />
      </div>
    </div>
  );
}

function Plan({ name, price, features, button, highlight }) {
  return (
    <div
      className={`rounded-2xl p-8 shadow-lg bg-white ${
        highlight ? "border-2 border-indigo-600 scale-105" : ""
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="text-3xl font-bold mb-6">{price}</div>

      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-600">
            <Check size={16} className="text-indigo-600" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to="/signup"
        className={`block text-center px-5 py-3 rounded-lg font-semibold ${
          highlight
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-800"
        }`}
      >
        {button}
      </Link>
    </div>
  );
}