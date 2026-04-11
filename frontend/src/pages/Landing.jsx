import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-10 py-5 fixed w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold">
            F
          </div>
          <span className="font-bold text-lg">FinSphere AI</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <button onClick={scrollToFeatures} className="hover:text-white transition">
            Products
          </button>
          <button onClick={scrollToFeatures} className="hover:text-white transition">
            Tools
          </button>
          <Link to="/about" className="hover:text-white transition">
            Learn
          </Link>
          <Link to="/about" className="hover:text-white transition">
            Why FinSphere
          </Link>
        </nav>

        <div className="flex gap-3">
          <Link to="/login">
            <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
              Open Account
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative px-10 pt-40 pb-32"
        style={{
          backgroundImage: "url('/images/finsphereeee.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              AI-Powered <br /> Financial Intelligence
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-xl">
              Manage your money, track investments, and grow wealth with next-gen AI insights.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate("/signup")}
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition hover:scale-105"
              >
                Get Started
              </button>

              <button
                onClick={scrollToFeatures}
                className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-lg transition"
              >
                Explore Features
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:scale-105 transition duration-500">
            <div className="text-gray-300 text-sm">Net Worth</div>
            <div className="text-4xl font-bold mt-2">₹12,45,000</div>

            <div className="h-44 mt-6 rounded-lg overflow-hidden">
              <img
                src="/images/finnn.png"
                alt="Finance Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-10 py-28 bg-gradient-to-b from-black to-slate-900">
        <h2 className="text-4xl font-bold text-center">
          Everything you need to master your money
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          <Feature title="Unified Dashboard" text="All accounts, assets, and liabilities in one place." />
          <Feature title="AI Insights" text="Smart recommendations powered by advanced AI." />
          <Feature title="Goal Planning" text="Achieve financial goals with precision planning." />
        </div>
      </section>

      {/* STATS */}
      <section className="px-10 py-24 bg-black text-center">
        <div className="grid md:grid-cols-4 gap-10">
          <Stat number="₹2T+" label="Assets tracked" />
          <Stat number="500K+" label="Users" />
          <Stat number="99.9%" label="Uptime" />
          <Stat number="4.9★" label="Rating" />
        </div>
      </section>

      {/* 🔥 PREMIUM CTA */}
      <section className="relative px-10 py-32 text-center overflow-hidden">

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>

        {/* GLOW */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500 opacity-30 blur-[140px] rounded-full"></div>

        {/* CONTENT */}
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">
            Start building wealth today
          </h2>

          <p className="text-gray-200 mt-4">
            Join thousands using AI to manage their finances smarter
          </p>

          <Link to="/signup">
            <button className="mt-8 bg-white text-black px-10 py-4 rounded-xl font-semibold hover:scale-110 transition duration-300 shadow-2xl">
              Create Free Account
            </button>
          </Link>
        </div>

      </section>

    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:scale-105 transition duration-300">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2">{text}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-3xl font-bold">{number}</div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
}