import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "../Schemas/RegisterSchema";
import { Button } from "../Components/ui/Button";
import { toast } from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
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
      const response = await registerAdmin({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response?.status !== 201) {
        throw new Error(
          (await response?.data?.message) || "Registration failed"
        );
      }

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Registration error:", err);
    }
  };

  const shouldShowError = (fieldName: keyof RegisterFormData) => {
    return (
      (dirtyFields[fieldName] || touchedFields[fieldName]) && errors[fieldName]
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-md w-full m-auto rounded-2xl p-8 shadow-input bg-white dark:bg-white/3 shadow-xl">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Create Account
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-center">
          Join our community today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                First Name
              </label>
              <input
                {...register("firstName")}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                placeholder="John"
              />
              {shouldShowError("firstName") && (
                <p className="text-sm text-red-500">
                  {errors.firstName?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                placeholder="Doe"
              />
              {shouldShowError("lastName") && (
                <p className="text-sm text-red-500">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Username
            </label>
            <input
              {...register("username")}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              placeholder="johndoe"
            />
            {shouldShowError("username") && (
              <p className="text-sm text-red-500">{errors.username?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              placeholder="john@example.com"
            />
            {shouldShowError("email") && (
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
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
            className="w-full relative inline-flex h-10 items-center justify-center rounded-md bg-gray-800 px-6 font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
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
                Creating account...
              </span>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};
