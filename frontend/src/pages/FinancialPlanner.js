import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  Target,
  Plus,
  Save,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"];

export default function FinancialPlanner() {
  const [drafts, setDrafts] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);

  const addPlanner = (type) => {
    setDrafts((d) => [
      ...d,
      { id: Date.now(), type, data: {}, mode: "smart" },
    ]);
  };

  const update = (id, field, value) => {
    setDrafts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, data: { ...p.data, [field]: value } } : p
      )
    );
  };

  const setMode = (id, mode) => {
    setDrafts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, mode } : p))
    );
  };

  const savePlan = (plan) => {
    setSavedPlans((s) => [...s, plan]);
    setDrafts((d) => d.filter((x) => x.id !== plan.id));
  };

  const removeDraft = (id) => {
    setDrafts((d) => d.filter((p) => p.id !== id));
  };

  const removeSaved = (id) => {
    setSavedPlans((s) => s.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <div className="text-2xl font-bold text-slate-800">
          Financial Planner
        </div>
        <div className="text-slate-500">
          Advanced personal finance planning & projections
        </div>
      </div>

      {/* ADD BUTTONS */}
      <div className="flex gap-3 flex-wrap">
        <AddBtn
          icon={<Wallet />}
          text="Budget Planner"
          onClick={() => addPlanner("budget")}
        />
        <AddBtn
          icon={<TrendingUp />}
          text="Savings Planner"
          onClick={() => addPlanner("savings")}
        />
        <AddBtn
          icon={<Target />}
          text="Retirement Planner"
          onClick={() => addPlanner("retirement")}
        />
      </div>

      {/* ACTIVE */}
      {drafts.length > 0 && (
        <div>
          <div className="font-semibold text-slate-700 mb-3">
            Active Planners
          </div>
          <div className="space-y-6">
            {drafts.map((p) => (
              <DraftCard
                key={p.id}
                planner={p}
                update={update}
                save={savePlan}
                remove={removeDraft}
                setMode={setMode}
              />
            ))}
          </div>
        </div>
      )}

      {/* SAVED */}
      {savedPlans.length > 0 && (
        <div>
          <div className="font-semibold text-slate-700 mb-3">
            My Financial Plans
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {savedPlans.map((p) => (
              <SavedCard key={p.id} planner={p} remove={removeSaved} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- DRAFT CARD ---------- */

function DraftCard({ planner, update, save, remove, setMode }) {
  const { type, data, id, mode } = planner;

  return (
    <div className="bg-white border rounded-2xl shadow">
      <div className="flex justify-between items-center px-6 py-4 border-b bg-slate-50">
        <div className="font-semibold text-slate-800">{title(type)}</div>

        <div className="flex items-center gap-4">
          {type === "budget" && (
            <ModeToggle id={id} mode={mode} setMode={setMode} />
          )}

          <button
            onClick={() => save(planner)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
          >
            <Save size={16} /> Save
          </button>

          <button
            onClick={() => remove(id)}
            className="text-slate-400 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 gap-4">
          {type === "budget" && (
            <>
              <Field
                label="Monthly Income"
                value={data.income}
                onChange={(v) => update(id, "income", v)}
              />
              {mode === "smart" ? (
                <>
                  <Field
                    label="Needs %"
                    value={data.needs}
                    onChange={(v) => update(id, "needs", v)}
                  />
                  <Field
                    label="Wants %"
                    value={data.wants}
                    onChange={(v) => update(id, "wants", v)}
                  />
                </>
              ) : (
                <Field
                  label="Monthly Expense"
                  value={data.expense}
                  onChange={(v) => update(id, "expense", v)}
                />
              )}
            </>
          )}

          {type === "savings" && (
            <>
              <Field
                label="Monthly Saving"
                value={data.monthly}
                onChange={(v) => update(id, "monthly", v)}
              />
              <Field
                label="Years"
                value={data.years}
                onChange={(v) => update(id, "years", v)}
              />
              <Field
                label="Return %"
                value={data.rate}
                onChange={(v) => update(id, "rate", v)}
              />
            </>
          )}

          {type === "retirement" && (
            <>
              <Field
                label="Monthly Invest"
                value={data.monthly}
                onChange={(v) => update(id, "monthly", v)}
              />
              <Field
                label="Age"
                value={data.age}
                onChange={(v) => update(id, "age", v)}
              />
              <Field
                label="Retire Age"
                value={data.retireAge}
                onChange={(v) => update(id, "retireAge", v)}
              />
            </>
          )}

          <Result type={type} data={data} mode={mode} />
        </div>

        <PieBlock type={type} data={data} mode={mode} />
      </div>
    </div>
  );
}

/* ---------- SAVED CARD ---------- */

function SavedCard({ planner, remove }) {
  return (
    <div className="bg-white rounded-2xl border shadow p-6 relative">
      <button
        onClick={() => remove(planner.id)}
        className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
      >
        <Trash2 size={16} />
      </button>

      <div className="font-semibold text-slate-800 mb-2">
        {title(planner.type)}
      </div>

      <Result type={planner.type} data={planner.data} mode={planner.mode} />
      <div className="mt-4">
        <PieBlock type={planner.type} data={planner.data} mode={planner.mode} />
      </div>
    </div>
  );
}

/* ---------- RESULT ---------- */

function Result({ type, data, mode }) {
  if (!data) return null;

  if (type === "budget") {
    const income = +data.income || 0;

    if (mode === "simple") {
      const expense = +data.expense || 0;
      const savings = income - expense;
      return <Output text={`Savings ₹${fmt(savings)}`} />;
    }

    const needs = +data.needs || 0;
    const wants = +data.wants || 0;
    const savings = 100 - needs - wants;
    return <Output text={`Savings ₹${fmt((income * savings) / 100)}`} />;
  }

  if (type === "savings") {
    const m = +data.monthly || 0;
    const y = +data.years || 0;
    const r = +data.rate || 0;
    const fv = m * 12 * ((Math.pow(1 + r / 100, y) - 1) / (r / 100 || 1));
    return <Output text={`Future Value ₹${fmt(fv)}`} />;
  }

  if (type === "retirement") {
    const m = +data.monthly || 0;
    const age = +data.age || 0;
    const rAge = +data.retireAge || 0;
    const yrs = rAge - age;
    const wealth = m * 12 * yrs * 1.8;
    return <Output text={`Retirement Wealth ₹${fmt(wealth)}`} />;
  }

  return null;
}

/* ---------- PIE ---------- */

function PieBlock({ type, data, mode }) {
  let pieData = [];

  if (type === "budget") {
    const income = +data.income || 1;

    if (mode === "simple") {
      const expense = +data.expense || 0;
      const savings = income - expense;
      pieData = [
        { name: "Expense", value: expense || 1 },
        { name: "Savings", value: savings || 1 },
      ];
    } else {
      const needs = +data.needs || 0;
      const wants = +data.wants || 0;
      const savings = 100 - needs - wants;
      pieData = [
        { name: "Needs", value: needs || 1 },
        { name: "Wants", value: wants || 1 },
        { name: "Savings", value: savings || 1 },
      ];
    }
  }

  if (type === "savings") {
    const m = +data.monthly || 0;
    const y = +data.years || 0;
    const r = +data.rate || 0;

    const invested = m * 12 * y;
    const fv = m * 12 * ((Math.pow(1 + r / 100, y) - 1) / (r / 100 || 1));
    const growth = fv - invested;

    pieData = [
      { name: "Invested", value: invested || 1 },
      { name: "Growth", value: growth || 1 },
    ];
  }

  if (type === "retirement") {
    const m = +data.monthly || 0;
    const age = +data.age || 0;
    const rAge = +data.retireAge || 0;
    const yrs = Math.max(rAge - age, 0);

    const invested = m * 12 * yrs;
    const corpus = invested * 1.8;

    pieData = [
      { name: "Invested", value: invested || 1 },
      { name: "Projected", value: corpus || 1 },
    ];
  }

  return (
    <div className="h-56 bg-slate-50 rounded-xl flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={80}
            innerRadius={40}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- UI ---------- */

function Field({ label, value, onChange }) {
  return (
    <div>
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function Output({ text }) {
  return (
    <div className="bg-indigo-50 text-indigo-700 rounded-lg px-4 py-3 font-medium">
      {text}
    </div>
  );
}

function AddBtn({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow"
    >
      <Plus size={16} />
      {text}
    </button>
  );
}

function ModeToggle({ id, mode, setMode }) {
  return (
    <div className="flex bg-white border rounded-lg overflow-hidden">
      <button
        onClick={() => setMode(id, "simple")}
        className={`px-3 py-1 text-sm flex items-center gap-1 ${
          mode === "simple" ? "bg-indigo-600 text-white" : "text-slate-600"
        }`}
      >
        <Wallet size={14} /> Simple
      </button>
      <button
        onClick={() => setMode(id, "smart")}
        className={`px-3 py-1 text-sm flex items-center gap-1 ${
          mode === "smart" ? "bg-indigo-600 text-white" : "text-slate-600"
        }`}
      >
        <SlidersHorizontal size={14} /> Smart
      </button>
    </div>
  );
}

function title(type) {
  if (type === "budget") return "Budget Plan";
  if (type === "savings") return "Savings Plan";
  if (type === "retirement") return "Retirement Plan";
}

function fmt(v) {
  return Math.round(v || 0).toLocaleString();
}