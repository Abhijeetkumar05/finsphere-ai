import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KPICards from "../components/KPICards";
import API from "../api"; // ✅ add this

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        console.log("🔥 FRONTEND DATA:", result);

        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!data) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <KPICards
        total={data.total}
        monthly={data.monthly}
        savings={data.portfolio}
        investments={data.investments}
      />
    </div>
  );
}