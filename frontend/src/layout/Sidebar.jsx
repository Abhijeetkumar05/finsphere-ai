import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  TrendingUp,
  Target,
  Brain,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("SIDEBAR PROFILE:", data);

        setProfile(data);
      } catch (err) {
        console.error("Sidebar profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <aside className="h-screen w-72 bg-slate-950 text-white flex flex-col border-r border-slate-800">
      
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg">
          F
        </div>
        <div>
          <div className="font-bold text-lg">FinSphere</div>
          <div className="text-xs text-slate-400">AI Finance</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Menu to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
        <Menu to="/expenses" icon={<Wallet size={18} />} text="Expenses" />
        <Menu to="/portfolio" icon={<PieChart size={18} />} text="Portfolio" />
        <Menu to="/investments" icon={<TrendingUp size={18} />} text="Investments" />
        <Menu to="/goals" icon={<Target size={18} />} text="Goals" />
        <Menu to="/planner" icon={<Brain size={18} />} text="Financial Planner" />
        <Menu to="/ai" icon={<Brain size={18} />} text="AI Insights" />
        <Menu to="/settings" icon={<Settings size={18} />} text="Settings" />
        <Menu to="/profile" icon={<User size={18} />} text="Profile" />
      </nav>

      {/* Financial Health */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-4">
          <div className="text-sm opacity-90">Financial Health</div>
          <div className="text-2xl font-bold mt-1">82%</div>
          <div className="text-xs opacity-80">Excellent stability</div>
        </div>
      </div>

      {/* User (DYNAMIC) */}
      <div className="px-6 py-4 border-t border-slate-800 flex items-center gap-3">
        <img
          src={
            profile?.avatar ||
            "https://randomuser.me/api/portraits/men/32.jpg"
          }
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="text-sm font-semibold">
            {profile?.name || "User"}
          </div>
          <div className="text-xs text-slate-400">
            {profile?.plan || "Free Plan"}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Menu({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      {icon}
      {text}
    </NavLink>
  );
}