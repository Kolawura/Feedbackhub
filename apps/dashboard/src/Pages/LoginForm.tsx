import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../Schemas/LoginSchema";
import { Button } from "../Components/ui/Button";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        emailOrUsername: data.identifier,
        password: data.password,
      });

      if (response?.status !== 200) {
        console.log(`Login failed for user: ${data.identifier}`);
      } else {
        toast.success("Logged in successfully");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response) {
        const errorMessage =
          err.response.data?.message ||
          err.response.statusText ||
          "Login failed";
        toast.error(errorMessage);
      } else if (err.request) {
        toast.error("Network error - please try again");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const shouldShowError = (fieldName: keyof LoginFormData) => {
    return (
      (dirtyFields[fieldName] || touchedFields[fieldName]) && errors[fieldName]
    );
  };

  return (
    <div className="flex justify-center item-center h-screen">
      <div className="h-fit m-auto min-w-md w-full rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-white/3 shadow-xl">
        <h2 className="font-bold text-xl text  text-neutral-800 dark:text-neutral-200">
          Welcome back
        </h2>
        <p className="text-neutral-600 text-sm text  max-w-sm mt-2 dark:text-neutral-300">
          Login to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
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
            />
            {shouldShowError("identifier") && (
              <p className="text-sm text-red-500">
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
            <input
              id="password"
              type="password"
              {...register("password")}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              placeholder="••••••••"
            />
            {shouldShowError("password") && (
              <p className="text-sm text-red-500">{errors.password?.message}</p>
            )}
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
        </form>

        <div className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};
