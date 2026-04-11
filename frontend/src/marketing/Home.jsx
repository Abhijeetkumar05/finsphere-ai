import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="flex justify-between items-center px-12 py-6">
        <div className="text-2xl font-bold">FinSphere AI</div>

        <div className="flex gap-6 items-center">
          <Link to="/login">Login</Link>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="px-12 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Personal Finance Platform
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Track spending, plan investments, and grow wealth with intelligent
            financial insights.
          </p>

          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold"
          >
            Start Free
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1551281044-8b1c1c3f4c6c"
          className="rounded-xl shadow-2xl"
          alt="finance"
        />
      </div>
    </div>
  );
}