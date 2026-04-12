import { useState } from "react";
import API from "../api"; // ✅ IMPORTANT

export default function AddExpense({ onAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Validation
      if (!title || !amount || !category) {
        alert("Please fill all fields");
        return;
      }

      const res = await fetch(`${API}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
        body: JSON.stringify({
          title,
          amount: Number(amount), // ✅ ensure number
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add expense");
        return;
      }

      alert("Expense added ✅");

      setTitle("");
      setAmount("");
      setCategory("");

      onAdded && onAdded(); // ✅ safe call
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
        type="number"
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