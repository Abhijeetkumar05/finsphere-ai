import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar({ title = "Dashboard" }) {

  const [profile, setProfile] = useState(null);

  /* ---------- FETCH PROFILE ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("TOPBAR PROFILE:", data);
        setProfile(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <header className="w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        <p className="text-xs text-slate-400">
          Intelligent financial management
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-9 pr-4 py-2 rounded-lg bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <img
            src={
              profile?.avatar ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt="user"
            className="w-9 h-9 rounded-full"
          />

          <div className="hidden md:block">
            <div className="text-sm font-semibold text-slate-700">
              {profile?.name || "User"}   {/* ✅ FIXED */}
            </div>
            <div className="text-xs text-slate-400">
              {profile?.plan || "Free"}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}