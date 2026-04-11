import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow-sm">
      
      {/* Left */}
      <div>
        <div className="text-xl font-bold text-slate-800">
          FinSphere Dashboard
        </div>
        <div className="text-xs text-slate-500">
          Intelligent financial intelligence
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-8 pr-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Notification */}
        <Bell className="text-slate-600 cursor-pointer" />

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="user"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
}