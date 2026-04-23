import { useState } from "react";
import { motion } from "framer-motion";
import { User, Globe, Sliders, AlertTriangle } from "lucide-react";
import { DangerTab } from "../Components/Settings/DangerTab";
import { ProfileTab } from "../Components/Settings/ProfileTab";
import { SitesTab } from "../Components/Settings/SitesTab";
import { WidgetTab } from "../Components/Settings/WidgetTab";

// ─── Tab nav ──────────────────────────────────────────────────────────────────
const tabs = [
  { id: "profile", label: "Profile", icon: <User size={14} /> },
  { id: "sites", label: "Sites", icon: <Globe size={14} /> },
  { id: "widget", label: "Widget", icon: <Sliders size={14} /> },
  { id: "danger", label: "Danger", icon: <AlertTriangle size={14} /> },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6">
          <p className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-1">
            Account
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text)]">
            Settings
          </h1>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-0 border-b border-[var(--border)] mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[var(--amber)] text-[var(--amber)]"
                  : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              } ${tab.id === "danger" ? "ml-auto" : ""}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "sites" && <SitesTab />}
          {activeTab === "widget" && <WidgetTab />}
          {activeTab === "danger" && <DangerTab />}
        </motion.div>
      </motion.div>
    </div>
  );
};
