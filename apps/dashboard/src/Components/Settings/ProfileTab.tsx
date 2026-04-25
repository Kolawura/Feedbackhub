import { EyeOff, Eye, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import { api } from "../../lib/axios";
import { Card } from "../ui/Card";
import { labelClass, inputClass } from "../ui/styles";
import { SectionHeader, SaveButton } from "../ui/SettingsUi";
import { useThemeStore } from "../../Store/useThemeStore";

export const ProfileTab = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    currentPassword: "",
    newPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, isSystemDefault, setTheme, resetToSystem } = useThemeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: Record<string, string> = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
      };
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }
      const res = await api.patch("/api/auth/profile", payload);
      if (res.data.success) {
        toast.success("Profile updated");
        setForm((f) => ({ ...f, currentPassword: "", newPassword: "" }));
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionHeader
        title="Profile"
        sub="Update your personal information and password"
      />
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First name</label>
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Last name</label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] pt-5">
          <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
            Change password — leave blank to keep current
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Current password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-muted)]"
                >
                  {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>New password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-muted)]"
                >
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <SaveButton loading={loading} />
        </div>
      </form>
      {/* Theme preference */}
      <div className="border-t border-[var(--border)] pt-5 mt-2">
        <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
          Appearance
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs border transition-colors capitalize ${
                theme === t && !isSystemDefault
                  ? "border-[var(--amber)] text-[var(--amber)] bg-[var(--amber-bg)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-light)] hover:text-[var(--text)]"
              }`}
            >
              {t === "dark" ? <Moon size={12} /> : <Sun size={12} />}
              {t}
            </button>
          ))}
          <button
            type="button"
            onClick={resetToSystem}
            className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs border transition-colors ${
              isSystemDefault
                ? "border-[var(--amber)] text-[var(--amber)] bg-[var(--amber-bg)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-light)] hover:text-[var(--text)]"
            }`}
          >
            <Monitor size={12} />
            System
          </button>
        </div>
        <p className="font-mono text-xs text-[var(--text-dim)] mt-3">
          {isSystemDefault ? (
            <>
              Following your OS — currently{" "}
              <span className="text-[var(--amber)]">{theme}</span>
            </>
          ) : (
            <>
              You have set <span className="text-[var(--amber)]">{theme}</span>{" "}
              mode manually
            </>
          )}
        </p>
      </div>
    </Card>
  );
};
