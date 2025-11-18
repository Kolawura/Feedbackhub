import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../Schemas/LoginSchema";
import { Button } from "../Components/ui/Button";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export const LoginForm = () => {
  // const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    {}
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
      const response = await login({
        identifier: data.identifier,
        password: data.password,
      });

      if (!response.success) {
        console.log(response.error);
        setError("identifier", {
          type: "manual",
          message: "Invalid username or email",
        });
        setError("password", {
          type: "manual",
          message: "Invalid password",
        });
        setError("root", {
          type: "manual",
          message: response.error || "Invalid login credentials",
        });
      } else {
        toast.success("Logged in successfully");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response) {
        const errorMessage = err.response.data?.message || "Login failed";
        setError("root", {
          type: "manual",
          message: errorMessage,
        });
        toast.error(errorMessage);
      } else if (err.request) {
        setError("root", {
          type: "manual",
          message: "Network error - please try again",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-fit m-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-white/3 shadow-xl">
        <h2 className="font-bold text-xl text-center  text-neutral-800 dark:text-neutral-200">
          Welcome back
        </h2>
        <p className="text-neutral-600 text-sm text-center max-w-sm mt-2 dark:text-neutral-300">
          Login to access your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          aria-disabled={isSubmitting}
          className="mt-8 space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Username or Email
            </label>
            <input
              id="identifier"
              {...register("identifier")}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              placeholder="username@example.com"
              aria-invalid={errors.identifier ? "true" : "false"}
              aria-describedby={
                errors.identifier ? "identifier-error" : undefined
              }
            />
            {errors.identifier && (
              <p
                key={errors.identifier?.message}
                className="text-sm text-red-500 transition-opacity duration-500 ease-in-out opacity-100"
              >
                {errors.identifier?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                placeholder="••••••••"
              />
              <button
                className="absolute bottom-2 right-3 h-5 w-5 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && (
              <p
                key={errors.password?.message}
                className="text-sm text-red-500 transition-opacity duration-500 ease-in-out opacity-100"
              >
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="mt-4 text-right text-xs text-neutral-600 dark:text-neutral-400">
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative inline-flex h-10 items-center justify-center rounded-md px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <>
                <LockIcon className="mr-2 h-4 w-4" />
                Login
              </>
            )}
          </Button>
          {errors.root && (
            <p className="text-sm text-red-600 text-center mt-4">
              {errors.root?.message}
            </p>
          )}
        </form>

        <div className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

// Suggested improvements for "Remember Me" functionality:
// 1. Backend logic
// When generating the refresh token, set a longer expiration if "Remember Me" is checked.

// in your login controller
// res.cookie("refreshToken", refreshToken, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "strict",
//   path: "/api/auth/refresh",
//   maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000, // 30 days if checked
// });

// 2. Frontend logic

// On your login form:

// const [rememberMe, setRememberMe] = useState(false);

// const onSubmit = async (data) => {
//   await loginAdmin({
//     username: data.username,
//     password: data.password,
//     rememberMe, // pass to backend
//   });
// };
