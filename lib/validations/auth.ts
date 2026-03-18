import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginPayload = z.infer<typeof loginSchema>;

/* ── Register ────────────────────────────────────── */

export const registerStep1Schema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be at most 100 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const registerStep2Schema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be at most 64 characters"),
  pincode: z.string().regex(/^\d{6}$/, "PIN must be 6 digits"),
});

export const registerSchema = registerStep1Schema.merge(registerStep2Schema);

export type RegisterStep1 = z.infer<typeof registerStep1Schema>;
export type RegisterStep2 = z.infer<typeof registerStep2Schema>;
export type RegisterPayload = z.infer<typeof registerSchema>;

/* ── Forgot Password ────────────────────────────── */

export const forgotPasswordSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
