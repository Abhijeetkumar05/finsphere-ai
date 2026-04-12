import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // ✅ IMPORTANT

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      // ✅ Validation
      if (!name || !email || !password) {
        setError("All fields are required ❗");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed ❌");
        setLoading(false);
        return;
      }

      // ✅ Success
      alert("Account created successfully 🎉");
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl w-96 shadow-2xl">

        <h1 className="text-3xl font-bold text-indigo-400 mb-1 text-center">
          FinSphere
        </h1>
        <p className="text-slate-400 text-sm text-center mb-6">
          AI-powered finance management
        </p>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-slate-400"
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500 transition duration-200 hover:scale-105"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}