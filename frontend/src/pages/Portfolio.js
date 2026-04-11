import { useEffect, useState } from "react";
import { Plus, Trash2, Wallet, BarChart3, Layers } from "lucide-react";

export default function Portfolio() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    type: "",
    sector: "",
    value: "",
  });

  // ✅ FETCH PORTFOLIO
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      const data = await res.json();

      setAssets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD ASSET
  const addAsset = async () => {
    if (!form.name || !form.type || !form.value) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          sector: form.sector,
          value: Number(form.value),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error adding asset");
        return;
      }

      // ✅ Always sync with backend
      fetchPortfolio();

      // ✅ Reset form
      setForm({
        name: "",
        type: "",
        sector: "",
        value: "",
      });

    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ✅ DELETE ASSET
  const deleteAsset = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/portfolio/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      // ✅ Refresh from backend
      fetchPortfolio();

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ SAFE DATA
  const safeAssets = Array.isArray(assets) ? assets : [];

  const totalValue = safeAssets.reduce(
    (sum, a) => sum + Number(a.value || 0),
    0
  );

  const totalAssets = safeAssets.length;

  const sectors = [...new Set(safeAssets.map((a) => a.sector))];

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="text-slate-500">
          Investment overview & diversification
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Value</p>
            <h2 className="text-xl font-bold">
              ₹{totalValue.toLocaleString()}
            </h2>
          </div>
          <Wallet className="text-indigo-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Assets</p>
            <h2 className="text-xl font-bold">{totalAssets}</h2>
          </div>
          <Layers className="text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Diversification</p>
            <h2 className="text-xl font-bold">
              {sectors.length} Types
            </h2>
          </div>
          <BarChart3 className="text-purple-500" />
        </div>

      </div>

      {/* ADD FORM */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="font-semibold">Add Investment</h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Asset Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border rounded-lg p-2"
          />

          <input
            placeholder="Type (Stock, Crypto...)"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border rounded-lg p-2"
          />

          <input
            placeholder="Sector"
            value={form.sector}
            onChange={(e) =>
              setForm({ ...form, sector: e.target.value })
            }
            className="border rounded-lg p-2"
          />

          <input
            type="number"
            placeholder="Value"
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: e.target.value })
            }
            className="border rounded-lg p-2"
          />

        </div>

        <button
          onClick={addAsset}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
        >
          <Plus size={16} /> Add Asset
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-4">Holdings</h2>

        {safeAssets.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            📊 No investments yet
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left">Asset</th>
                <th className="text-left">Type</th>
                <th className="text-left">Sector</th>
                <th className="text-right">Value</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {safeAssets.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="py-2 font-medium">{a.asset_name}</td>
                  <td>{a.type}</td>
                  <td>{a.sector}</td>
                  <td className="text-right">
                    ₹{Number(a.value).toLocaleString()}
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => deleteAsset(a.id)}
                      className="text-red-500 hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}