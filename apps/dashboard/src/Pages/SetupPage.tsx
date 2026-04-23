import { useState } from "react";
import {
  Check,
  Copy,
  ArrowRight,
  Terminal,
  BarChart2,
  Layers,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSiteStore } from "../Store/useSiteStore";
import { useSites } from "../Hooks/useSite";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const SetupPage = () => {
  const navigate = useNavigate();
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

      <div className="relative z-10 max-w-2xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--green)]/30 bg-[var(--green-bg)] text-[var(--green)] font-mono text-xs tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
            Account created
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight mb-4">
            Set up your
            <br />
            <span className="text-[var(--amber)]">feedback widget.</span>
          </h1>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-md">
            Generate a script tag, drop it into your site's{" "}
            <code className="font-mono text-xs bg-[var(--bg-surface-2)] border border-[var(--border)] px-1.5 py-0.5 text-[var(--amber)]">
              {"<head>"}
            </code>
            , and you're live.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <SetupWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
            What's next
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)]">
            {[
              {
                icon: <Terminal size={16} />,
                title: "Install widget",
                desc: "Paste the script tag into your HTML head section.",
              },
              {
                icon: <Layers size={16} />,
                title: "Customize",
                desc: "Adjust widget position and appearance.",
              },
              {
                icon: <BarChart2 size={16} />,
                title: "View dashboard",
                desc: "See feedback and analytics roll in.",
                action: () => navigate("/dashboard"),
              },
            ].map((s) => (
              <div
                key={s.title}
                onClick={s.action}
                className={`bg-[var(--bg)] p-5 ${s.action ? "cursor-pointer hover:bg-[var(--bg-surface)]" : ""} transition-colors group`}
              >
                <span className="text-[var(--amber)] mb-3 block">{s.icon}</span>
                <p className="font-mono text-xs text-[var(--text)] mb-1">
                  {s.title}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{s.desc}</p>
                {s.action && (
                  <div className="flex items-center gap-1 mt-3 font-mono text-xs text-[var(--amber)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Go <ArrowRight size={10} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SetupWidget = () => {
  const [scriptGenerated, setScriptGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [webName, setWebName] = useState("");
  const [siteId, setSiteId] = useState("");
  const widgetPosition = useSiteStore((s) => s.widgetPosition);
  const setWidgetPosition = useSiteStore((s) => s.setWidgetPosition);
  const { addSiteMutation } = useSites();

  const scriptTag = siteId
    ? `<script src="https://widgetfb.netlify.app/src/main.js" data-site-id="${siteId}"></script>`
    : "";

  const generateSite = () => {
    if (!webName.trim()) return toast.error("Enter a website name first");
    addSiteMutation.mutate(webName, {
      onSuccess: (data) => {
        if (data?.newSite) {
          setSiteId(data.newSite.siteId);
          setScriptGenerated(true);
          toast.success("Site created!");
        }
      },
      onError: (err: any) =>
        toast.error(err?.message || "Failed to create site"),
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] font-mono text-sm px-4 py-3 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors disabled:opacity-40";
  const labelClass =
    "block font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2";

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
          Widget setup
        </p>
      </div>
      <div className="p-6 space-y-5">
        <div>
          <label className={labelClass}>Website name</label>
          <input
            value={webName}
            onChange={(e) => setWebName(e.target.value)}
            placeholder="my-app"
            disabled={scriptGenerated}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Widget position</label>
          <select
            value={widgetPosition}
            onChange={(e) => setWidgetPosition(e.target.value as any)}
            className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] font-mono text-sm px-4 py-3 focus:outline-none focus:border-[var(--amber)] transition-colors"
          >
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-left">Bottom left</option>
            <option value="top-right">Top right</option>
            <option value="top-left">Top left</option>
          </select>
        </div>

        {scriptGenerated && (
          <div>
            <label className={labelClass}>Your script tag</label>
            <div className="relative bg-[var(--bg)] border border-[var(--border)]">
              <pre className="font-mono text-xs text-[var(--green)] p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
                {scriptTag}
              </pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--amber)] hover:border-[var(--amber-border)] transition-colors"
              >
                {copied ? (
                  <Check size={11} className="text-[var(--green)]" />
                ) : (
                  <Copy size={11} />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-[var(--text-dim)] font-mono">
              Paste inside{" "}
              <span className="text-[var(--text-muted)]">{"<head>"}</span> of
              your HTML.
            </p>
          </div>
        )}

        <button
          onClick={scriptGenerated ? copyToClipboard : generateSite}
          disabled={addSiteMutation.isPending}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {addSiteMutation.isPending ? (
            <>
              <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : scriptGenerated ? (
            <>
              {copied ? <Check size={14} /> : <Copy size={14} />} Copy script
              tag
            </>
          ) : (
            <>
              Generate script tag <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
