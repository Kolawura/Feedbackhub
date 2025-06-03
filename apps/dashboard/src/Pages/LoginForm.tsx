import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../Schemas/LoginSchema";

const LoginForm = () => {
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
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          <LockIcon size={16} />
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
