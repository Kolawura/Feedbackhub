import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "../Schemas/RegisterSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registering with:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-white/3 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create Account
      </h2>
      <div>
        <label>First Name</label>
        <input
          {...register("firstName")}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input
          {...register("lastName")}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label>Username</label>
        <input
          {...register("username")}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          {...register("email")}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        <UserPlus size={16} />
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
