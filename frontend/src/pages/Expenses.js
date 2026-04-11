import { useEffect, useState } from "react";
import { AlertTriangle, Plus, Trash2, Brain } from "lucide-react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
  });

  // ✅ FETCH
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/expenses?date=${selectedDate}`,
        {
          headers: { Authorization: token },
        }
      );

      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line
  }, []);

  // ➕ ADD
  const addExpense = async () => {
    if (!form.title || !form.category || !form.amount) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: "", category: "", amount: "" });

        setSelectedDate(""); // ✅ IMPORTANT FIX
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ DELETE
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  // 📊 CALC
  const total = Array.isArray(expenses)
  ? expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
  : 0;

  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + Number(e.amount || 0);
  });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

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

        {/* ✅ ONLY ONE DATE */}
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

      {/* ADD */}
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
            className="bg-indigo-600 text-white rounded"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.category}</td>
                <td>
                  {new Date(e.created_at).toLocaleDateString()}
                </td>
                <td>₹{e.amount}</td>
                <td>
                  <button onClick={() => deleteExpense(e.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <div className="text-sm">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}