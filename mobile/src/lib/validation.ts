import { z } from "zod";

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(24, "Username must be at most 24 characters long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      )
      .trim(),
    email: z.email("Please enter a valid email").trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(24, "Password must be at most 24 characters long")
      .regex(/[a-zA-Z]/, "Must contain at least one letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(24, "Username must be at most 24 characters long")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(24, "Password must be at most 24 characters long")
    .trim(),
});

export const ForgotPasswordVerifySchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(24, "Username must be at most 24 characters long")
    .trim(),
  email: z.email("Please enter a valid email").trim(),
});

export const ForgotPasswordResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(24, "Password must be at most 24 characters long")
      .regex(/[a-zA-Z]/, "Contain at least one letter")
      .regex(/[0-9]/, "Contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Contain at least one special character")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password and confirm password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const ProfileEditSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(100, "First name must be at most 100 characters long")
    .trim(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(100, "Last name must be at most 100 characters long")
    .trim(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(24, "Username must be at most 24 characters long")
    .trim(),
  email: z.email("Please enter a valid email").trim(),
  gender: z.enum(["male", "female", "other"], "Please select your gender"),
  dob: z
    .string()
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      return !isNaN(dob.getTime());
    }, "Please enter a valid birth date.")
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = new Date();
      return dob <= today;
    }, "Birth date cannot be in the future.")
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = new Date();
      const minDob = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
      return dob >= minDob;
    }, "Birth date is too far in the past. Please enter a realistic date.")
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = new Date();
      const minAgeDob = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
      return dob <= minAgeDob;
    }, "You must be at least 12 years old."),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(1500, "Bio must be at most 1500 characters long")
    .trim()
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ForgotPasswordVerifySchemaType = z.infer<typeof ForgotPasswordVerifySchema>;
export type ForgotPasswordResetSchemaType = z.infer<typeof ForgotPasswordResetSchema>;
export type ProfileEditSchemaType = z.infer<typeof ProfileEditSchema>;
