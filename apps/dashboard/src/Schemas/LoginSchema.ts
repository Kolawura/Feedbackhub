import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Username or email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
