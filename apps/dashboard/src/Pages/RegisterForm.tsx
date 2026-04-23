import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "../Schemas/RegisterSchema";
import { toast } from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const { registerAdmin } = useAuth();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerAdmin({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  const shouldShowError = (f: keyof RegisterFormData) =>
    (dirtyFields[f] || touchedFields[f]) && errors[f];
  const inputClass =
    "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm font-mono px-4 py-3 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors";
  const labelClass =
    "block font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-12 font-serif">
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
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-10 text-center">
          <span className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase">
            ◆ FeedbackHub
          </span>
        </div>

        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-[var(--text)] mb-1">
              Create account
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Start collecting feedback in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First name</label>
                <input
                  {...register("firstName")}
                  placeholder="John"
                  className={inputClass}
                />
                {shouldShowError("firstName") && (
                  <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  {...register("lastName")}
                  placeholder="Doe"
                  className={inputClass}
                />
                {shouldShowError("lastName") && (
                  <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Username</label>
              <input
                {...register("username")}
                placeholder="johndoe"
                className={inputClass}
              />
              {shouldShowError("username") && (
                <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                  {errors.username?.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="john@example.com"
                className={inputClass}
              />
              {shouldShowError("email") && (
                <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                  {errors.email?.message}
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
              {shouldShowError("password") && (
                <p className="mt-1.5 text-xs font-mono text-[var(--red)]">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm py-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account →"
              )}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs font-mono text-[var(--text-dim)]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[var(--amber)] hover:opacity-80 transition-opacity"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};
