import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token
        localStorage.setItem("token", data.token);

        // ✅ Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white">

      {/* Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl w-96 shadow-2xl">

        {/* Branding */}
        <h1 className="text-3xl font-bold text-indigo-400 mb-1 text-center">
          FinSphere
        </h1>
        <p className="text-slate-400 text-sm text-center mb-6">
          AI-powered finance management
        </p>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Show / Hide */}
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-slate-400"
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500 transition duration-200 hover:scale-105"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="mt-4 text-sm text-center">
          No account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}