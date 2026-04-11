import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ========= AUTH ========= */
import Login from "./auth/Login";
import Signup from "./auth/Signup";

/* ========= LAYOUT ========= */
import Layout from "./layout/Layout";

/* ========= DASHBOARD PAGES ========= */
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Portfolio from "./pages/Portfolio";
import Investments from "./pages/Investments";
import Goals from "./pages/Goals";
import FinancialPlanner from "./pages/FinancialPlanner";
import AllInsightsPage from "./pages/AllInsightsPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

/* ========= LANDING PAGE (IMPORTANT) ========= */
import Landing from "./pages/Landing";

/* ========= MARKETING ========= */
import Features from "./marketing/Features";
import Pricing from "./marketing/Pricing";
import About from "./marketing/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ MAIN LANDING PAGE */}
        <Route path="/" element={<Landing />} />

        {/* Optional marketing pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App Layout (Dashboard Pages) */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/planner" element={<FinancialPlanner />} />
          <Route path="/ai" element={<AllInsightsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}