import { useState, useEffect } from "react";
import {
  User,
  Shield,
  Bell,
  Link,
  Brain,
  Moon,
  Download,
  Trash2,
  Plus,
} from "lucide-react";

/* ---------- DEFAULT ---------- */
const defaultSettings = {
  profile: {
    name: "",
    email: "",
    mobile: "",
  },
  security: {
    twoFA: true,
    biometric: false,
    autoLogout: true,
  },
  notifications: {
    email: true,
    push: true,
    spending: true,
    goals: true,
  },
  ai: {
    insights: true,
    categorize: true,
    forecasts: true,
  },
  appearance: {
    darkMode: false,
  },
  accounts: [],
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [newAccount, setNewAccount] = useState("");

  /* ---------- LOAD ---------- */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data) {
          setSettings(data);
        } else {
          setSettings(defaultSettings);
     }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
  }, []);

  /* ---------- SAVE ---------- */
  const saveAll = async (next) => {
    setSettings(next);

    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(next),
      });
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- DARK MODE ---------- */
  useEffect(() => {
    const root = document.documentElement;

    settings?.appearance?.darkMode
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [settings?.appearance?.darkMode]);

  /* ---------- TOGGLE ---------- */
  const toggle = (section, key) => {
    const next = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: !settings[section][key],
      },
    };
    saveAll(next);
  };

  /* ---------- ACCOUNTS ---------- */
  const addAccount = () => {
    if (!newAccount.trim()) return;

    const next = {
      ...settings,
      accounts: [
        ...settings.accounts,
        { id: Date.now(), name: newAccount },
      ],
    };

    saveAll(next);
    setNewAccount("");
  };

  const removeAccount = (id) => {
    const next = {
      ...settings,
      accounts: settings.accounts.filter((a) => a.id !== id),
    };
    saveAll(next);
  };

  /* ---------- EXPORT ---------- */
  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify(settings, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finsphere-settings.json";
    a.click();
  };

  /* ---------- DELETE ---------- */
  const deleteAccount = async () => {
    if (!window.confirm("Delete account permanently?")) return;

    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/settings", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Account deleted");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">

      {/* PROFILE */}
      <Card icon={<User />} title="Profile">
        <Input
          label="Full Name"
          value={settings.profile.name}
          onChange={(v) =>
            saveAll({
              ...settings,
              profile: { ...settings.profile, name: v },
            })
          }
        />

        <Input
          label="Email"
          value={settings.profile.email}
          onChange={(v) =>
            saveAll({
              ...settings,
              profile: { ...settings.profile, email: v },
            })
          }
        />

        <Input
          label="Mobile"
          value={settings.profile.mobile}
          onChange={(v) =>
            saveAll({
              ...settings,
              profile: { ...settings.profile, mobile: v },
            })
          }
        />

        <button
          onClick={() => saveAll(settings)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </Card>

      {/* SECURITY */}
      <Card icon={<Shield />} title="Security">
        <Toggle label="2FA" value={settings.security.twoFA} onChange={() => toggle("security", "twoFA")} />
        <Toggle label="Biometric" value={settings.security.biometric} onChange={() => toggle("security", "biometric")} />
        <Toggle label="Auto logout" value={settings.security.autoLogout} onChange={() => toggle("security", "autoLogout")} />
      </Card>

      {/* NOTIFICATIONS */}
      <Card icon={<Bell />} title="Notifications">
        <Toggle label="Email alerts" value={settings.notifications.email} onChange={() => toggle("notifications", "email")} />
        <Toggle label="Push" value={settings.notifications.push} onChange={() => toggle("notifications", "push")} />
        <Toggle label="Spending alerts" value={settings.notifications.spending} onChange={() => toggle("notifications", "spending")} />
        <Toggle label="Goal reminders" value={settings.notifications.goals} onChange={() => toggle("notifications", "goals")} />
      </Card>

      {/* ACCOUNTS */}
      <Card icon={<Link />} title="Accounts">
        {settings.accounts.map((a) => (
          <div key={a.id} className="flex justify-between border p-2 rounded">
            {a.name}
            <button onClick={() => removeAccount(a.id)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <input
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
            placeholder="Bank / Card"
            className="border px-3 py-2 rounded flex-1"
          />
          <button onClick={addAccount} className="bg-indigo-600 text-white px-3 rounded flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
      </Card>

      {/* AI */}
      <Card icon={<Brain />} title="AI">
        <Toggle label="Insights" value={settings.ai.insights} onChange={() => toggle("ai", "insights")} />
        <Toggle label="Categorize" value={settings.ai.categorize} onChange={() => toggle("ai", "categorize")} />
        <Toggle label="Forecast" value={settings.ai.forecasts} onChange={() => toggle("ai", "forecasts")} />
      </Card>

      {/* APPEARANCE */}
      <Card icon={<Moon />} title="Appearance">
        <Toggle
          label="Dark mode"
          value={settings?.appearance?.darkMode}
          onChange={() => toggle("appearance", "darkMode")}
        />
      </Card>

      {/* EXPORT */}
      <Card icon={<Download />} title="Data">
        <button onClick={exportData} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Export Data
        </button>
      </Card>

      {/* DELETE */}
      <Card icon={<Trash2 />} title="Danger" danger>
        <button onClick={deleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </Card>

    </div>
  );
}

/* ---------- UI ---------- */

function Card({ icon, title, children, danger }) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <div className={danger ? "text-red-600 font-bold" : "font-bold"}>
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <button onClick={onChange}>
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <div>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 w-full rounded"
      />
    </div>
  );
}