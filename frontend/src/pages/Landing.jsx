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
          <button onClick={scrollToFeatures} className="hover:text-white">
            Products
          </button>
          <button onClick={scrollToFeatures} className="hover:text-white">
            Tools
          </button>
          <Link to="/about" className="hover:text-white">
            Learn
          </Link>
          <Link to="/about" className="hover:text-white">
            Why FinSphere
          </Link>
        </nav>

        <div className="flex gap-3">
          <Link to="/login">
            <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
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
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

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
                className="bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Get Started
              </button>

              <button
                onClick={scrollToFeatures}
                className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10"
              >
                Explore Features
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="text-gray-300 text-sm">Net Worth</div>
            <div className="text-4xl font-bold mt-2">₹12,45,000</div>

            <div className="h-44 mt-6 rounded-lg overflow-hidden">
              <img
                src="/images/finnn.png"
                alt="Finance Dashboard"
                className="w-full h-full object-cover"
                loading="lazy" // ✅ performance improvement
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

      {/* CTA */}
      <section className="relative px-10 py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>

        <div className="relative z-10">
          <h2 className="text-5xl font-bold">
            Start building wealth today
          </h2>

          <p className="text-gray-200 mt-4">
            Join thousands using AI to manage their finances smarter
          </p>

          <Link to="/signup">
            <button className="mt-8 bg-white text-black px-10 py-4 rounded-xl font-semibold">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

/* UI */
function Feature({ title, text }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
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