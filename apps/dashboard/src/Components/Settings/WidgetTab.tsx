import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSites } from "../../Hooks/useSite";
import { WidgetConfig } from "../../Type";
import { Card } from "../ui/Card";
import { labelClass, inputClass } from "../ui/styles";
import { SectionHeader, SaveButton } from "../ui/SettingsUi";
import { WidgetPreview } from "./WidgetPreview";

const DEFAULT_CONFIG: WidgetConfig = {
  buttonText: "Feedback",
  buttonColor: "#f5a623",
  position: "bottom-right",
  theme: "auto",
};

export const WidgetTab = () => {
  const { sitesQuery, updateConfigMutation } = useSites();
  const sites = sitesQuery.data ?? [];
  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    sites[0]?.siteId ?? "",
  );
  const selectedSite = sites.find((s) => s.siteId === selectedSiteId);

  const [config, setConfig] = useState<WidgetConfig>(
    selectedSite?.widgetConfig ?? DEFAULT_CONFIG,
  );

  // When site selection changes, load that site's config
  const handleSiteChange = (siteId: string) => {
    setSelectedSiteId(siteId);
    const site = sites.find((s) => s.siteId === siteId);
    setConfig(site?.widgetConfig ?? DEFAULT_CONFIG);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSiteId) {
      toast.error("Select a site first");
      return;
    }
    updateConfigMutation.mutate({ siteId: selectedSiteId, config });
  };

  const scriptTag = selectedSiteId
    ? `<script src="https://widgetfb.netlify.app/src/main.js" data-site-id="${selectedSiteId}"></script>`
    : "";

  const [copiedScript, setCopiedScript] = useState(false);
  const copyScript = () => {
    if (!scriptTag) return;
    navigator.clipboard.writeText(scriptTag);
    setCopiedScript(true);
    toast.success("Copied!");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  if (sites.length === 0) {
    return (
      <Card>
        <p className="font-mono text-xs text-[var(--text-dim)] py-4">
          Add a site in the <span className="text-[var(--amber)]">Sites</span>{" "}
          tab first.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <SectionHeader
          title="Widget customizer"
          sub="Changes are saved per site and applied automatically by the widget"
        />

        {/* Site picker */}
        <div className="mb-6">
          <label className={labelClass}>Site</label>
          <select
            value={selectedSiteId}
            onChange={(e) => handleSiteChange(e.target.value)}
            className={inputClass}
          >
            {sites.map((s) => (
              <option key={s.siteId} value={s.siteId}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Button text */}
            <div>
              <label className={labelClass}>Button text</label>
              <input
                value={config.buttonText}
                onChange={(e) =>
                  setConfig({ ...config, buttonText: e.target.value })
                }
                placeholder="Feedback"
                maxLength={24}
                className={inputClass}
              />
            </div>

            {/* Button color */}
            <div>
              <label className={labelClass}>Button color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.buttonColor}
                  onChange={(e) =>
                    setConfig({ ...config, buttonColor: e.target.value })
                  }
                  className="w-10 h-10 border border-[var(--border)] bg-[var(--bg)] cursor-pointer p-0.5"
                />
                <input
                  value={config.buttonColor}
                  onChange={(e) =>
                    setConfig({ ...config, buttonColor: e.target.value })
                  }
                  placeholder="#f5a623"
                  className={`${inputClass} flex-1`}
                />
              </div>
            </div>

            {/* Position */}
            <div>
              <label className={labelClass}>Position</label>
              <select
                value={config.position}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    position: e.target.value as WidgetConfig["position"],
                  })
                }
                className={inputClass}
              >
                <option value="bottom-right">Bottom right</option>
                <option value="bottom-left">Bottom left</option>
                <option value="top-right">Top right</option>
                <option value="top-left">Top left</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className={labelClass}>Widget theme</label>
              <select
                value={config.theme}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    theme: e.target.value as WidgetConfig["theme"],
                  })
                }
                className={inputClass}
              >
                <option value="auto">Auto (match site)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          {/* Live preview */}
          <div>
            <p className={labelClass}>Preview</p>
            <WidgetPreview config={config} />
          </div>

          <div className="flex justify-end">
            <SaveButton loading={updateConfigMutation.isPending} />
          </div>
        </form>
      </Card>

      {/* Script tag */}
      {selectedSiteId && (
        <Card>
          <SectionHeader
            title="Script tag"
            sub="Paste this into the <head> of your website"
          />
          <div className="relative bg-[var(--bg)] border border-[var(--border)]">
            <pre className="font-mono text-xs text-[var(--green)] p-4 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
              {scriptTag}
            </pre>
            <button
              onClick={copyScript}
              className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--amber)] hover:border-[var(--amber-border)] transition-colors"
            >
              {copiedScript ? (
                <Check size={11} className="text-[var(--green)]" />
              ) : (
                <Copy size={11} />
              )}
              {copiedScript ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-2 font-mono text-xs text-[var(--text-dim)]">
            The widget fetches its configuration automatically — no need to
            update the script tag when you change settings here.
          </p>
        </Card>
      )}
    </div>
  );
};
