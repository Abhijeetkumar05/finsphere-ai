import { useEffect, useState } from "react";
import { Plus, Trash2, Target } from "lucide-react";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
    type: "General",
  });

  const token = localStorage.getItem("token");

  // ✅ FETCH GOALS (NO WARNING VERSION)
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/goals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setGoals(data);
        } else {
          setGoals([]);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setGoals([]);
        setLoading(false);
      }
    };

    fetchGoals();
  }, [token]);

  // ✅ ADD GOAL
  async function addGoal() {
    if (!form.name || !form.target) return;

    try {
      const res = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          target: Number(form.target),
          saved: Number(form.saved || 0),
        }),
      });

      const data = await res.json();

      if (data.id) {
        setGoals([data, ...goals]);
      }

      setForm({
        name: "",
        target: "",
        saved: "",
        deadline: "",
        type: "General",
      });
    } catch (err) {
      console.error(err);
    }
  }

  // ✅ DELETE GOAL
  async function removeGoal(id) {
    try {
      await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals(goals.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-slate-800">
            Financial Goals
          </div>
          <div className="text-slate-500">
            Plan and track your future milestones
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500">Active Goals</div>
          <div className="text-2xl font-bold text-indigo-600">
            {goals.length}
          </div>
        </div>
      </div>

      {/* ADD GOAL */}
      <div className="bg-white rounded-2xl p-6 shadow border">
        <div className="font-semibold mb-4">Create New Goal</div>

        <div className="grid md:grid-cols-5 gap-3">
          <input
            placeholder="Goal name"
            className="border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Target ₹"
            className="border rounded-lg px-3 py-2"
            value={form.target}
            onChange={(e) =>
              setForm({ ...form, target: e.target.value })
            }
          />

          <input
            placeholder="Saved ₹"
            className="border rounded-lg px-3 py-2"
            value={form.saved}
            onChange={(e) =>
              setForm({ ...form, saved: e.target.value })
            }
          />

          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={form.deadline}
            onChange={(e) =>
              setForm({ ...form, deadline: e.target.value })
            }
          />

          <button
            onClick={addGoal}
            className="bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-slate-500">Loading...</div>
      ) : (
        <>
          {/* EMPTY */}
          {goals.length === 0 && (
            <div className="text-center text-slate-500">
              No goals yet
            </div>
          )}

          {/* GOALS GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {goals.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                remove={() => removeGoal(g.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* AI INSIGHTS (UNCHANGED) */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="font-semibold mb-2">AI Goal Insights</div>
        <div className="space-y-1 text-sm opacity-90">
          <div>• Emergency fund goal is on track</div>
          <div>• Increase monthly savings by ₹4,000</div>
          <div>• Vehicle goal achievable in 18 months</div>
        </div>
      </div>
    </div>
  );
}

function GoalCard({ goal, remove }) {
  const pct = Math.min((goal.saved / goal.target) * 100, 100).toFixed(0);

  const remaining = goal.target - goal.saved;

  const monthsLeft = goal.deadline
    ? Math.max(
        Math.round(
          (new Date(goal.deadline) - new Date()) /
            (1000 * 60 * 60 * 24 * 30)
        ),
        1
      )
    : null;

  const monthlyNeed = monthsLeft
    ? Math.round(remaining / monthsLeft)
    : null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow border relative">
      <Trash2
        size={16}
        className="absolute top-4 right-4 text-red-500 cursor-pointer"
        onClick={remove}
      />

      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Target className="text-indigo-600" size={18} />
        </div>

        <div>
          <div className="font-semibold text-slate-800">
            {goal.name}
          </div>
          <div className="text-xs text-slate-500">
            {goal.type}
          </div>
        </div>
      </div>

      <div className="text-sm text-slate-500">
        ₹{goal.saved} / ₹{goal.target}
      </div>

      <div className="h-2 bg-slate-200 rounded mt-2">
        <div
          className="h-2 bg-indigo-600 rounded"
          style={{ width: pct + "%" }}
        />
      </div>

      <div className="text-xs text-slate-500 mt-2">
        {pct}% achieved
      </div>

      {monthsLeft && (
        <div className="mt-3 text-xs text-slate-600">
          {monthsLeft} months left
        </div>
      )}

      {monthlyNeed && (
        <div className="mt-1 text-xs text-indigo-600 font-medium">
          Save ₹{monthlyNeed}/month
        </div>
      )}
    </div>
  );
}