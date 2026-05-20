import { z } from "zod";

export const PROFILE_MIN_AGE = 12;
export const PROFILE_MAX_AGE = 120;

const getTodayNormalized = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

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
      .regex(/[a-zA-Z]/, "Contain at least one letter")
      .regex(/[0-9]/, "Contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Contain at least one special character")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password and confirm password do not match",
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
    .trim()
    .min(1, "Date of birth is required")
    .refine((dateStr) => !Number.isNaN(new Date(dateStr).getTime()), {
      message: "Please enter a valid date of birth",
    })
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const todayNormalized = getTodayNormalized();
      return dob <= todayNormalized;
    }, {
      message: "Date of birth cannot be in the future",
    })
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = getTodayNormalized();
      const oldestAllowedDob = new Date(
        today.getFullYear() - PROFILE_MAX_AGE,
        today.getMonth(),
        today.getDate(),
      );
      return dob >= oldestAllowedDob;
    }, {
      message: `Please enter a realistic date of birth (not more than ${PROFILE_MAX_AGE} years ago)`,
    })
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = getTodayNormalized();
      const minimumAgeDob = new Date(
        today.getFullYear() - PROFILE_MIN_AGE,
        today.getMonth(),
        today.getDate(),
      );
      return dob <= minimumAgeDob;
    }, {
      message: `You must be at least ${PROFILE_MIN_AGE} years old`,
    }),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(1500, "Bio must be at most 1500 characters long")
    .trim()
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ProfileEditSchemaType = z.infer<typeof ProfileEditSchema>;
