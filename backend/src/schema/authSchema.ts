import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().refine(
    (input) => {
      return (
        /[a-z]/.test(input) &&
        /[A-Z]/.test(input) &&
        /[0-9]/.test(input) &&
        /[^a-zA-Z0-9]/.test(input) &&
        input.length >= 8
      );
    },
    {
      message:
        "Password must be at least 8 characters and include upper/lowercase letters, a number, and a special character.",
    }
  ),
});

export const loginSchema = z.object({
  identifier: z.string().min(3, "Username or email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
