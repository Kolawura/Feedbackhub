import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../Schemas/LoginSchema";
import { Button } from "../Components/ui/Button";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Logging in with:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Username or Email</label>
        <input
          {...register("identifier")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.identifier && (
          <p className="text-red-500">{errors.identifier.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit">
          <LockIcon size={16} />
          Login
        </Button>
      </div>
    </form>
  );
};
