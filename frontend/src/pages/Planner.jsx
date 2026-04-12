export default function Planner() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Financial Planner</h1>
        <p className="text-slate-500">
          Plan savings & investments with smart insights
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-700">
          Salary-based planning tool
        </p>

        <p className="text-sm text-gray-400 mt-2">
          (Coming soon: AI-based planning & projections 🚀)
        </p>
      </div>

    </div>
  );
}