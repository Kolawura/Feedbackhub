import { useState } from "react";
import {
  Check,
  Copy,
  ArrowRight,
  Terminal,
  BarChart2,
  Settings,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSites } from "../Hooks/useSite";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { WidgetConfig } from "../Type";

// ─── Shared ───────────────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] font-mono text-sm px-4 py-3 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors disabled:opacity-40";
const labelClass =
  "block font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2";

// ─── Widget live preview ──────────────────────────────────────────────────────
const WidgetPreview = ({ config }: { config: WidgetConfig }) => {
  const posMap: Record<string, React.CSSProperties> = {
    "bottom-right": { bottom: 12, right: 12 },
    "bottom-left": { bottom: 12, left: 12 },
    "top-right": { top: 12, right: 12 },
    "top-left": { top: 12, left: 12 },
  };

  return (
    <div className="relative w-full h-28 border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      <p className="absolute top-2 left-3 font-mono text-xs text-[var(--text-dim)] opacity-40 select-none">
        your website
      </p>
      {/* Fake page lines */}
      <div className="absolute inset-x-6 top-8 space-y-1.5 opacity-10">
        {[40, 60, 45, 55].map((w, i) => (
          <div
            key={i}
            className="h-1.5 bg-[var(--text)] rounded-full"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      {/* Button preview */}
      <button
        className="absolute font-sans text-xs font-semibold px-4 py-2 rounded-full shadow-md text-white transition-none cursor-default"
        style={{ background: config.buttonColor, ...posMap[config.position] }}
      >
        {config.buttonText || "Feedback"}
      </button>
    </div>
  );
};

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepDot = ({
  n,
  active,
  done,
}: {
  n: number;
  active: boolean;
  done: boolean;
}) => (
  <div
    className={`w-7 h-7 flex items-center justify-center font-mono text-xs border transition-colors ${
      done
        ? "bg-[var(--green)] border-[var(--green)] text-white"
        : active
          ? "bg-[var(--amber)] border-[var(--amber)] text-[#0e0e0f]"
          : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-dim)]"
    }`}
  >
    {done ? <Check size={12} /> : n}
  </div>
);

// ─── Step 1: Name your site ───────────────────────────────────────────────────
const Step1 = ({
  onDone,
}: {
  onDone: (siteId: string, siteName: string) => void;
}) => {
  const [name, setName] = useState("");
  const { addSiteMutation } = useSites();

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Enter a website name first");
      return;
    }
    addSiteMutation.mutate(name.trim(), {
      onSuccess: (data) => {
        if (data?.newSite) {
          toast.success("Site created!");
          onDone(data.newSite.siteId, name.trim());
        }
      },
      onError: (err: any) =>
        toast.error(err?.message || "Failed to create site"),
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-1">
          Name your website
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          This is just a label — use something recognisable like "my-portfolio"
          or "acme-app".
        </p>
      </div>
      <div>
        <label className={labelClass}>Website name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          placeholder="my-website"
          className={inputClass}
          autoFocus
        />
      </div>
      <button
        onClick={handleCreate}
        disabled={addSiteMutation.isPending || !name.trim()}
        className="flex items-center gap-2 px-5 py-3 bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {addSiteMutation.isPending ? (
          <>
            <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />
            Creating...
          </>
        ) : (
          <>
            Continue <ArrowRight size={14} />
          </>
        )}
      </button>
    </div>
  );
};

// ─── Step 2: Customise widget ─────────────────────────────────────────────────
const Step2 = ({
  config,
  setConfig,
  onDone,
}: {
  config: WidgetConfig;
  setConfig: (c: WidgetConfig) => void;
  onDone: () => void;
}) => {
  const set = (patch: Partial<WidgetConfig>) =>
    setConfig({ ...config, ...patch });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-1">
          Customise the button
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          These settings are saved and loaded automatically by the widget — no
          script tag changes needed.
        </p>
      </div>

      <WidgetPreview config={config} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Button text</label>
          <input
            value={config.buttonText}
            onChange={(e) => set({ buttonText: e.target.value })}
            maxLength={24}
            placeholder="Feedback"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Button color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.buttonColor}
              onChange={(e) => set({ buttonColor: e.target.value })}
              className="w-11 h-11 border border-[var(--border)] bg-[var(--bg)] cursor-pointer p-0.5 flex-shrink-0"
            />
            <input
              value={config.buttonColor}
              onChange={(e) => set({ buttonColor: e.target.value })}
              placeholder="#f5a623"
              className={`${inputClass} flex-1`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Position</label>
          <select
            value={config.position}
            onChange={(e) =>
              set({ position: e.target.value as WidgetConfig["position"] })
            }
            className={inputClass}
          >
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-left">Bottom left</option>
            <option value="top-right">Top right</option>
            <option value="top-left">Top left</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Theme</label>
          <select
            value={config.theme}
            onChange={(e) =>
              set({ theme: e.target.value as WidgetConfig["theme"] })
            }
            className={inputClass}
          >
            <option value="auto">Auto (match visitor's OS)</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDone}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Save & continue <ArrowRight size={14} />
        </button>
        <button
          onClick={onDone}
          className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

// ─── Step 3: Get the script tag ───────────────────────────────────────────────
const Step3 = ({ siteId, siteName }: { siteId: string; siteName: string }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { updateConfigMutation } = useSites();

  const scriptTag = `<script src="https://widgetfb.netlify.app/src/main.js" data-site-id="${siteId}"></script>`;

  const copy = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-1">
          Install the widget
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Paste this script tag into the{" "}
          <code className="font-mono text-xs bg-[var(--bg-surface-2)] border border-[var(--border)] px-1.5 py-0.5 text-[var(--amber)]">
            {"<head>"}
          </code>{" "}
          of every page on{" "}
          <span className="text-[var(--text)]">{siteName}</span>.
        </p>
      </div>

      {/* Script tag block */}
      <div className="relative bg-[var(--bg)] border border-[var(--border)]">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)]">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)]" />
          <span className="ml-2 font-mono text-xs text-[var(--text-dim)]">
            index.html
          </span>
        </div>
        <pre className="font-mono text-xs text-[var(--green)] p-4 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
          {`<head>\n  ...\n  ${scriptTag}\n</head>`}
        </pre>
        <button
          onClick={copy}
          className="absolute top-10 right-2 flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--amber)] hover:border-[var(--amber-border)] transition-colors"
        >
          {copied ? (
            <Check size={11} className="text-[var(--green)]" />
          ) : (
            <Copy size={11} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Site ID reference */}
      <div className="flex items-start gap-3 border border-[var(--border)] bg-[var(--bg-surface-2)] px-4 py-3">
        <span className="text-[var(--amber)] font-mono text-xs mt-0.5">◆</span>
        <div>
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5">
            Your site ID
          </p>
          <p className="font-mono text-sm text-[var(--text)]">{siteId}</p>
          <p className="font-mono text-xs text-[var(--text-dim)] mt-1">
            You can find this again in Settings → Sites.
          </p>
        </div>
      </div>

      {/* Framework snippets */}
      <details className="border border-[var(--border)]">
        <summary className="px-4 py-3 font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest cursor-pointer hover:bg-[var(--bg-hover)] transition-colors list-none flex items-center justify-between">
          Using React / Next.js / Vue?
          <ChevronRight size={12} className="text-[var(--text-dim)]" />
        </summary>
        <div className="border-t border-[var(--border)] p-4 space-y-4">
          {[
            {
              label: "Next.js (app/layout.tsx)",
              code: `import Script from 'next/script';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        {children}\n        <Script\n          src="https://widgetfb.netlify.app/src/main.js"\n          data-site-id="${siteId}"\n          strategy="lazyOnload"\n        />\n      </body>\n    </html>\n  );\n}`,
            },
            {
              label: "React (index.html)",
              code: `<!-- Add to public/index.html <head> -->\n${scriptTag}`,
            },
            {
              label: "Vue / Nuxt (nuxt.config.ts)",
              code: `export default defineNuxtConfig({\n  app: {\n    head: {\n      script: [{\n        src: 'https://widgetfb.netlify.app/src/main.js',\n        'data-site-id': '${siteId}',\n        defer: true,\n      }],\n    },\n  },\n});`,
            },
          ].map((f) => (
            <div key={f.label}>
              <p className="font-mono text-xs text-[var(--text-dim)] mb-2">
                {f.label}
              </p>
              <pre className="font-mono text-xs text-[var(--green)] bg-[var(--bg)] border border-[var(--border)] p-3 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                {f.code}
              </pre>
            </div>
          ))}
        </div>
      </details>

      {/* Next actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <BarChart2 size={14} />
          Go to dashboard
        </button>
        <button
          onClick={() => navigate("/settings?tab=widget")}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-[var(--border)] text-[var(--text-muted)] font-mono text-sm hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
        >
          <Settings size={14} />
          Customise widget
        </button>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
export const SetupPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [siteId, setSiteId] = useState("");
  const [siteName, setSiteName] = useState("");
  const { updateConfigMutation } = useSites();

  const DEFAULT_CONFIG: WidgetConfig = {
    buttonText: "Feedback",
    buttonColor: "#f5a623",
    position: "bottom-right",
    theme: "auto",
  };
  const [config, setConfig] = useState<WidgetConfig>(DEFAULT_CONFIG);

  const handleStep1Done = (id: string, name: string) => {
    setSiteId(id);
    setSiteName(name);
    setStep(2);
  };

  const handleStep2Done = () => {
    // Save config to backend — non-blocking so user isn't waiting
    updateConfigMutation.mutate({ siteId, config });
    setStep(3);
  };

  const steps = [
    { n: 1, label: "Name site" },
    { n: 2, label: "Customise" },
    { n: 3, label: "Install" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif px-4 py-12 md:py-20">
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase">
            ◆ FeedbackHub
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text)] mt-4 mb-2 leading-tight">
            Set up your
            <br />
            <span className="text-[var(--amber)]">feedback widget.</span>
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Three steps and you're collecting feedback.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2">
                <StepDot n={s.n} active={step === s.n} done={step > s.n} />
                <span
                  className={`font-mono text-xs uppercase tracking-widest hidden sm:block ${
                    step === s.n
                      ? "text-[var(--text)]"
                      : "text-[var(--text-dim)]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-px w-6 md:w-10 mx-2 transition-colors ${
                    step > s.n ? "bg-[var(--green)]" : "bg-[var(--border)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && <Step1 onDone={handleStep1Done} />}
              {step === 2 && (
                <Step2
                  config={config}
                  setConfig={setConfig}
                  onDone={handleStep2Done}
                />
              )}
              {step === 3 && <Step3 siteId={siteId} siteName={siteName} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
