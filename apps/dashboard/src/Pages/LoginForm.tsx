import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../Schemas/LoginSchema";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const errorTimers = useRef<{ [key in keyof LoginFormData]?: NodeJS.Timeout }>(
    {},
  );
  useEffect(() => {
    Object.entries(errors).forEach(([field]) => {
      const key = field as keyof LoginFormData;
      if (!errorTimers.current[key]) {
        errorTimers.current[key] = setTimeout(() => {
          clearErrors(key);
          delete errorTimers.current[key];
        }, 3000);
      }
    });
    return () => {
      Object.values(errorTimers.current).forEach(clearTimeout);
      errorTimers.current = {};
    };
  }, [errors, clearErrors]);

  const { login } = useAuth();
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ identifier: data.identifier, password: data.password });
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid credentials";
      setError("root", { type: "manual", message: msg });
      toast.error(msg);
    }
  };

  const inputClass =
    "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm font-mono px-4 py-3 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors";
  const labelClass =
    "block font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 font-serif">
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <span className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase">
            ◆ FeedbackHub
          </span>
        </div>

        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-[var(--text)] mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Sign in to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className={labelClass}>Username or email</label>
              <input
                {...register("identifier")}
                placeholder="you@example.com"
                className={inputClass}
              />
              {errors.identifier && (
                <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {errors.root && (
              <div className="border border-[var(--red)]/30 bg-[var(--red-bg)] px-4 py-3">
                <p className="text-xs font-mono text-[var(--red)]">
                  {errors.root.message}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm py-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in →"
              )}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs font-mono text-[var(--text-dim)]">
          No account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[var(--amber)] hover:opacity-80 transition-opacity"
          >
            Register free
          </button>
        </p>
      </motion.div>
    </div>
  );
};
