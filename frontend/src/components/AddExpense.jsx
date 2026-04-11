import { useState } from "react";

export default function AddExpense({ onAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title,
          amount,
          category,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Expense added ✅");

        setTitle("");
        setAmount("");
        setCategory("");

        onAdded(); // refresh dashboard
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    }
  };

  return (
    <div className="bg-slate-900 p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-3">Add Expense</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 bg-slate-800 rounded"
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 bg-slate-800 rounded"
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
      />

      <button
        onClick={handleAdd}
        className="w-full bg-indigo-600 py-2 rounded"
      >
        Add Expense
      </button>
    </div>
  );
}