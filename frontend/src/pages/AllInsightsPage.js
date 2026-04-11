import React, { useEffect, useState, useCallback } from "react";

const AllInsightsPage = () => {
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    totalPortfolio: 0,
    expenseCount: 0,
    goalCount: 0,
    score: 0,
  });

  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAI = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      // 🚨 If no token → stop
      if (!token) {
        setError("⚠️ Please login first");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/ai", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🚨 Handle auth error
      if (res.status === 401) {
        setError("⚠️ Session expired. Please login again.");
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }

      const data = await res.json();

      console.log("AI DATA:", data);

      // 🚨 Safety check
      if (!data.summary) {
        setError("⚠️ No data received from backend");
        setLoading(false);
        return;
      }

      setSummary(data.summary);
      setInsights(data.insights || []);
      setLoading(false);

    } catch (err) {
      console.error("AI fetch error:", err);
      setError("⚠️ Server error. Try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAI();
  }, [fetchAI]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        🧠 AI Financial Insights
      </h1>

      {/* 🔄 Loading */}
      {loading && (
        <p className="text-gray-500">Loading AI insights...</p>
      )}

      {/* ❌ Error */}
      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {/* ✅ MAIN CONTENT */}
      {!loading && !error && (
        <>
          {/* 🔹 SUMMARY CARDS */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white shadow p-4 rounded-xl">
              <p className="text-gray-500">Income</p>
              <h2 className="text-xl font-bold text-green-600">
                ₹{summary.totalInvestment}
              </h2>
            </div>

            <div className="bg-white shadow p-4 rounded-xl">
              <p className="text-gray-500">Savings</p>
              <h2 className="text-xl font-bold text-blue-600">
                ₹{summary.totalPortfolio}
              </h2>
            </div>

            <div className="bg-white shadow p-4 rounded-xl">
              <p className="text-gray-500">Expenses</p>
              <h2 className="text-xl font-bold text-red-500">
                {summary.expenseCount}
              </h2>
            </div>

            <div className="bg-white shadow p-4 rounded-xl">
              <p className="text-gray-500">Goals</p>
              <h2 className="text-xl font-bold text-purple-600">
                {summary.goalCount}
              </h2>
            </div>
          </div>

          {/* 🔹 FINANCIAL HEALTH */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl mb-6 shadow">
            <h2 className="text-lg">Financial Health</h2>
            <p className="text-4xl font-bold mt-2">
              {summary.score}%
            </p>
            <p className="text-sm mt-1">
              AI evaluated stability
            </p>
          </div>

          {/* 🔹 INSIGHTS */}
          <div className="space-y-4">
            {insights.length === 0 ? (
              <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-500">
                No AI insights yet. Add more expenses, goals, or investments.
              </div>
            ) : (
              insights.map((i, index) => (
                <div
                  key={index}
                  className="bg-white shadow p-5 rounded-xl border-l-4 border-purple-500"
                >
                  <h3 className="text-lg font-semibold">
                    {i.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {i.desc}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllInsightsPage;