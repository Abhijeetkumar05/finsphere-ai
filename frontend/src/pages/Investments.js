import { useEffect, useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

export default function Investments() {
  const [investments, setInvestments] = useState([]);
  const [summary, setSummary] = useState({
    invested: 0,
    current: 0,
    profit: 0,
    profitPct: 0,
  });

  const [form, setForm] = useState({
    name: "",
    type: "",
    amount: "",
    current: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔥 FIX: Bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res1 = await fetch("http://localhost:5000/api/investments", { headers });
      const data1 = await res1.json();

      setInvestments(Array.isArray(data1) ? data1 : []);

      const res2 = await fetch("http://localhost:5000/api/investments/summary", { headers });
      const data2 = await res2.json();

      setSummary(data2);

    } catch (err) {
      console.error(err);
      setInvestments([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD INVESTMENT
  const addInvestment = async () => {
    if (!form.name || !form.amount || !form.current) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 FIXED
        },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          amount: Number(form.amount),
          current: Number(form.current),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error adding investment");
        return;
      }

      // ✅ refresh data
      fetchData();

      // ✅ clear form (NO STOCK DEFAULT)
      setForm({
        name: "",
        type: "",
        amount: "",
        current: "",
      });

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE
  const remove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/investments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 FIXED
        },
      });

      fetchData();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading investments...</div>;
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">Investments</div>
          <div className="text-slate-500">
            Track and grow your wealth portfolio
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500">Total Value</div>
          <div className="text-2xl font-bold text-indigo-600">
            ₹{Number(summary.current || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6">

        <Stat title="Invested" value={summary.invested} />
        <Stat title="Current" value={summary.current} />

        <div className="bg-white rounded-2xl p-5 shadow border">
          <div className="text-sm text-slate-500">Profit / Loss</div>
          <div className={`text-xl font-bold mt-1 ${
            summary.profit >= 0 ? "text-emerald-600" : "text-red-500"
          }`}>
            ₹{Number(summary.profit || 0).toLocaleString()} ({summary.profitPct}%)
          </div>

          {summary.profit >= 0 ? (
            <TrendingUp className="mt-2 text-emerald-500" size={18} />
          ) : (
            <TrendingDown className="mt-2 text-red-500" size={18} />
          )}
        </div>

      </div>

      {/* ADD */}
      <div className="bg-white rounded-2xl p-6 shadow border">
        <div className="font-semibold mb-4">Add Investment</div>

        <div className="grid md:grid-cols-5 gap-3">

          <input
            placeholder="Asset name"
            className="border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Type (Stock, MF, Crypto, Gold)"
            className="border rounded-lg px-3 py-2"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <input
            placeholder="Invested ₹"
            className="border rounded-lg px-3 py-2"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            placeholder="Current ₹"
            className="border rounded-lg px-3 py-2"
            value={form.current}
            onChange={(e) => setForm({ ...form, current: e.target.value })}
          />

          <button
            onClick={addInvestment}
            className="bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="px-6 py-4 font-semibold border-b">
          Your Holdings
        </div>

        {investments.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            📊 No investments yet
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Asset</th>
                <th className="p-3">Type</th>
                <th className="p-3">Invested</th>
                <th className="p-3">Current</th>
                <th className="p-3">Return</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {investments.map((i) => {
                const diff = i.current - i.amount;
                const pct = i.amount ? ((diff / i.amount) * 100).toFixed(1) : 0;

                return (
                  <tr key={i.id} className="border-t">
                    <td className="p-3 font-medium">{i.name}</td>
                    <td className="p-3 text-center">{i.type}</td>
                    <td className="p-3 text-center">₹{i.amount}</td>
                    <td className="p-3 text-center">₹{i.current}</td>
                    <td className={`p-3 text-center font-semibold ${
                      diff >= 0 ? "text-green-600" : "text-red-500"
                    }`}>
                      {pct}%
                    </td>
                    <td className="p-3 text-right">
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => remove(i.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow border">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-xl font-bold mt-1">
        ₹{Number(value || 0).toLocaleString()}
      </div>
    </div>
  );
}