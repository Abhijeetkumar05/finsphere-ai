import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}