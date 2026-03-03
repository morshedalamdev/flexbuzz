"use server";

import { useFetcher } from "@/hooks/use-fetcher";
import { LoginState, SignupState, StatusType } from "@/lib/types";
import { LoginSchema, SignupSchema } from "@/lib/validation";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function signup(
  state: SignupState | undefined,
  formData: FormData,
): Promise<SignupState> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher<LoginResponse>("/auth/login");

  const validatedData = SignupSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      status: StatusType.ERROR,
      message: "Validation failed. Please check the fields.",
      username: typeof data.username === "string" ? data.username : undefined,
      email: typeof data.email === "string" ? data.email : undefined,
    };
  }

  const res = await fetcher({
    method: "POST",
    payload: {
      username: validatedData.data.username,
      email: validatedData.data.email,
      password: validatedData.data.password,
    },
  });

  console.log(res);

  return { status: StatusType.SUCCESS, message: "Signup successful!" };
}
// HDe94&5d

export async function login(
  state: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher<LoginResponse>("/auth/login");

  const validatedData = LoginSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      status: StatusType.ERROR,
      message: "Validation failed. Please check the fields.",
      username: typeof data.username === "string" ? data.username : undefined,
    };
  }

  const res = await fetcher({
    method: "POST",
    payload: {
      username: validatedData.data.username,
      password: validatedData.data.password,
    },
  });

  if (!res.success) {
    return {
      status: StatusType.ERROR,
      message: res?.message as unknown as string,
      username: validatedData.data.username,
    };
  }

  return { status: StatusType.SUCCESS, message: "Login successful!" };
}
// password123
