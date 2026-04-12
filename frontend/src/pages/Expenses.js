import { useEffect, useState, useCallback } from "react";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import API from "../api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
  });

  /* =========================
     FETCH EXPENSES
  ========================= */
  const fetchExpenses = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${API}/api/expenses${selectedDate ? `?date=${selectedDate}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch expenses");

      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setExpenses([]);
    }
  }, [selectedDate]);

  /* =========================
     AUTO REFRESH
  ========================= */
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  /* =========================
     ADD EXPENSE
  ========================= */
  const addExpense = async () => {
    if (!form.title || !form.category || !form.amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      if (!res.ok) throw new Error("Add failed");

      setForm({ title: "", category: "", amount: "" });

      // refresh
      fetchExpenses();
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add expense");
    }
  };

  /* =========================
     DELETE EXPENSE
  ========================= */
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchExpenses();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete expense");
    }
  };

  /* =========================
     CALCULATIONS
  ========================= */
  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + Number(e.amount || 0);
  });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-slate-500">
            AI-powered spending intelligence
          </p>
        </div>

        {/* DATE FILTER */}
        <div className="flex gap-3 bg-white p-2 rounded-xl shadow">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <button
            onClick={fetchExpenses}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>
        </div>
      </div>

      {/* ALERT */}
      {topCategory && (
        <div className="bg-amber-50 p-4 rounded-xl flex gap-3">
          <AlertTriangle className="text-amber-500" />
          <div>
            High spending in <b>{topCategory[0]}</b>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Total Spend" value={`₹${total}`} />
        <Card title="Transactions" value={expenses.length} />
        <Card
          title="Top Category"
          value={topCategory ? topCategory[0] : "-"}
        />
      </div>

      {/* ADD FORM */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button
            onClick={addExpense}
            className="bg-indigo-600 text-white rounded flex items-center justify-center gap-1"
          >
            <Plus size={16} /> Add
          </button>

        </div>
      </div>

      {/* EMPTY */}
      {expenses.length === 0 && (
        <div className="text-center text-gray-400 py-6">
          No expenses yet
        </div>
      )}

      {/* TABLE */}
      {expenses.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="py-2">{e.title}</td>
                  <td>{e.category}</td>
                  <td>
                    {new Date(e.created_at).toLocaleDateString()}
                  </td>
                  <td>₹{e.amount}</td>
                  <td>
                    <button
                      onClick={() => deleteExpense(e.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

/* =========================
   CARD COMPONENT
========================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}