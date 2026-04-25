import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, BarChart2, Shield, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-4 md:pt-18 lg:pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[var(--amber)] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 md:mb-8 border border-[var(--amber-border)] bg-[var(--amber-bg)] text-[var(--amber)] text-xs font-mono tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] animate-[amber-pulse_2s_ease-in-out_infinite]" />
            v1.0 — Now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-5 md:mb-6"
          >
            Hear every
            <br />
            <span className="text-[var(--amber)]">user voice.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-base md:text-xl text-[var(--text-muted)] max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            Drop one script tag. Collect structured feedback, track real
            visitors, and turn raw signals into product decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
            >
              Start free{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 md:px-7 py-3 md:py-3.5 border border-[var(--border)] text-[var(--text-muted)] font-mono text-sm hover:border-[var(--amber-border)] hover:text-[var(--text)] transition-all w-full sm:w-auto"
            >
              Sign in
            </button>
          </motion.div>

          {/* Code preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 md:mt-16 max-w-2xl mx-auto"
          >
            <div className="border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)]" />
                <span className="ml-2 text-[var(--text-dim)] font-mono text-xs">
                  index.html
                </span>
              </div>
              <div className="px-4 md:px-5 py-4 font-mono text-xs md:text-sm text-[var(--text-muted)] overflow-x-auto">
                <span className="text-[var(--text-dim)]">
                  {"<"}head{">"}
                </span>
                <br />
                <span className="ml-4 text-[var(--text)]">
                  {"<"}script
                </span>{" "}
                <span className="text-[var(--amber)]">src</span>
                <span className="text-[var(--text)]">="</span>
                <span className="text-[var(--green)]">
                  https://widgetfb.netlify.app/src/main.js
                </span>
                <span className="text-[var(--text)]">"</span>
                <br />
                <span className="ml-11 text-[var(--amber)]">data-site-id</span>
                <span className="text-[var(--text)]">="</span>
                <span className="text-[var(--red)]">site_your_id</span>
                <span className="text-[var(--text)]">
                  "{">"}
                  {"<"}/script{">"}
                </span>
                <br />
                <span className="text-[var(--text-dim)]">
                  {"<"}/head{">"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "1 line", label: "to install" },
            { value: "4 types", label: "of feedback" },
            { value: "Real-time", label: "visitor data" },
            { value: "100%", label: "your data" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <p className="font-display text-2xl md:text-3xl font-bold text-[var(--amber)]">
                {stat.value}
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-1 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-4">
            Why FeedbackHub
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Built for builders,
            <br />
            <span className="text-[var(--text-muted)]">not marketers.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)]">
          {[
            {
              icon: <Terminal size={18} />,
              title: "One script. Everything.",
              desc: "Paste a single script tag and your site is live — feedback collection, visitor tracking, and session data. No npm, no config files.",
            },
            {
              icon: <BarChart2 size={18} />,
              title: "Actionable analytics.",
              desc: "See where visitors come from, what pages they visit, and what they say. Correlated visitor data and feedback in one view.",
            },
            {
              icon: <Zap size={18} />,
              title: "Structured by default.",
              desc: "Every piece of feedback is tagged with category, priority, browser, OS, and location. No manual triage.",
            },
            {
              icon: <Shield size={18} />,
              title: "Yours, always.",
              desc: "All data lives in your database. No third-party analytics black boxes. You own every row.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[var(--bg)] p-6 md:p-8 group hover:bg-[var(--bg-surface)] transition-colors duration-300"
            >
              <div className="flex items-center gap-2 text-[var(--amber)] mb-4 font-mono text-sm">
                {f.icon}
                <span className="text-[var(--text-dim)] group-hover:text-[var(--amber)] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-8"
          >
            How it works
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {[
              {
                n: "01",
                title: "Sign up",
                desc: "Create your admin account in under a minute.",
              },
              {
                n: "02",
                title: "Add your site",
                desc: "Name your site and generate a unique ID.",
              },
              {
                n: "03",
                title: "Install the widget",
                desc: "Paste one script tag into your HTML.",
              },
              {
                n: "04",
                title: "Watch it roll in",
                desc: "Feedback and visitor data appear instantly.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border-l border-[var(--border)] pl-5 md:px-6 md:first:pl-0 md:first:border-l-0"
              >
                <span className="font-mono text-3xl font-bold text-[var(--border)] block mb-3">
                  {step.n}
                </span>
                <h3 className="font-display font-semibold text-[var(--text)] mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            Ready to listen
            <br />
            to your users?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm hover:opacity-90 transition-opacity mx-auto"
            >
              Create free account{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-4 md:px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-[var(--text-dim)] tracking-widest uppercase">
            ◆ FeedbackHub
          </span>
          <span className="font-mono text-xs text-[var(--text-dim)]">
            Built for developers who care about their users.
          </span>
        </div>
      </footer>
    </div>
  );
};
