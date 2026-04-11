export default function About() {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="px-10 py-24 text-center bg-gradient-to-r from-indigo-600 to-purple-600">
        <h1 className="text-5xl font-bold">About FinSphere AI</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-white/90">
          FinSphere is an AI-powered financial intelligence platform helping individuals 
          manage money, track investments, and build long-term wealth with precision.
        </p>
      </section>

      {/* MISSION */}
      <section className="px-10 py-24 grid md:grid-cols-2 gap-16 items-center bg-black">

        {/* IMAGE (YOUR IMAGE) */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="/images/fin.png"
            alt="Finance"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            We believe financial intelligence should not be limited to experts.
            Our mission is to democratize finance using AI, helping people gain clarity,
            confidence, and control over their financial future.
          </p>

          <ul className="space-y-4 text-gray-400">
            <li>✔ AI-powered financial insights</li>
            <li>✔ Real-time expense & investment tracking</li>
            <li>✔ Personalized financial planning</li>
            <li>✔ Bank-level security & privacy</li>
          </ul>
        </div>
      </section>

      {/* WHY FINSPHERE */}
      <section className="px-10 py-24 bg-gradient-to-b from-black to-slate-900 text-center">
        <h2 className="text-4xl font-bold mb-12">Why FinSphere?</h2>

        <div className="grid md:grid-cols-3 gap-10">

          <Card 
            title="AI Intelligence"
            text="Advanced algorithms analyze your financial behavior and guide smarter decisions."
          />

          <Card 
            title="All-in-One Platform"
            text="Track expenses, investments, savings, and goals in one unified dashboard."
          />

          <Card 
            title="Future Ready"
            text="Built for the next generation of finance with automation and predictive insights."
          />

        </div>
      </section>

      {/* STATS */}
      <section className="px-10 py-20 bg-black text-center">
        <div className="grid md:grid-cols-4 gap-10">

          <Stat number="50K+" label="Active Users" />
          <Stat number="₹120Cr+" label="Assets Managed" />
          <Stat number="99.9%" label="Secure Infrastructure" />
          <Stat number="4.9★" label="User Satisfaction" />

        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-24 text-center bg-gradient-to-r from-indigo-600 to-purple-600">
        <h2 className="text-4xl font-bold">
          Ready to take control of your finances?
        </h2>

        <button className="mt-6 bg-white text-black px-8 py-3 rounded-lg hover:scale-105 transition">
          Get Started with FinSphere
        </button>
      </section>

    </div>
  );
}

/* COMPONENTS */

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-3xl font-bold text-indigo-400">{number}</div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:scale-105 transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 mt-3">{text}</p>
    </div>
  );
}