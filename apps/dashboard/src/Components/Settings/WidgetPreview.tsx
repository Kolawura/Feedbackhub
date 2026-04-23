import { WidgetConfig } from "../../Type";

export const WidgetPreview = ({ config }: { config: WidgetConfig }) => {
  const posMap: Record<string, string> = {
    "bottom-right": "bottom-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "top-right": "top-3 right-3",
    "top-left": "top-3 left-3",
  };

  const isDark =
    config.theme === "dark" ||
    (config.theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      className="relative w-full h-36 border border-[var(--border)] overflow-hidden"
      style={{ background: isDark ? "#18181b" : "#f4f4f5" }}
    >
      <p
        className="absolute top-2 left-3 font-mono text-xs opacity-20"
        style={{ color: isDark ? "#fff" : "#000" }}
      >
        your website
      </p>
      <button
        className="absolute font-mono text-xs px-4 py-2 rounded-full shadow-lg font-medium"
        style={{
          background: config.buttonColor,
          color: "#fff",
          ...(posMap[config.position]
            ? Object.fromEntries(
                posMap[config.position].split(" ").map((cls) => {
                  const [side, val] = cls.split("-");
                  return [side, `${val === "3" ? "12" : val}px`];
                }),
              )
            : {}),
        }}
      >
        {config.buttonText || "Feedback"}
      </button>
    </div>
  );
};
