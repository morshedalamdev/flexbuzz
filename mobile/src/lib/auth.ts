import { createFetcher } from "@/hooks/use-fetcher";
import { deleteToken, storeToken } from "@/lib/token";
import { LoginSchema, SignupSchema } from "@/lib/validation";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthError = {
  success: false;
  message: string;
};

export type AuthSuccess = {
  success: true;
  accessToken: string;
  refreshToken: string;
};

export type SignupInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export async function signup(
  input: SignupInput,
): Promise<AuthSuccess | AuthError> {
  const validatedData = SignupSchema.safeParse(input);
  if (!validatedData.success) {
    const firstError = Object.values(
      validatedData.error.flatten().fieldErrors,
    ).flat()[0];
    return {
      success: false,
      message: firstError ?? "Validation failed. Please check the fields.",
    };
  }

  const { fetcher } = createFetcher<LoginResponse>("/auth/register");
  const res = await fetcher({
    method: "POST",
    payload: {
      username: validatedData.data.username,
      email: validatedData.data.email,
      password: validatedData.data.password,
    },
  });

  if (!res.success || !res.data) {
    return {
      success: false,
      message: res.message || "Signup failed. Please try again.",
    };
  }

  storeToken({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });

  return {
    success: true,
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
}

export async function login(
  input: LoginInput,
): Promise<AuthSuccess | AuthError> {
  const validatedData = LoginSchema.safeParse(input);
  if (!validatedData.success) {
    const firstError = Object.values(
      validatedData.error.flatten().fieldErrors,
    ).flat()[0];
    return {
      success: false,
      message: firstError ?? "Validation failed. Please check the fields.",
    };
  }

  const { fetcher } = createFetcher<LoginResponse>("/auth/login");
  const res = await fetcher({
    method: "POST",
    payload: {
      username: validatedData.data.username,
      password: validatedData.data.password,
    },
  });

  if (!res.success || !res.data) {
    return {
      success: false,
      message: res.message || "Login failed. Please try again.",
    };
  }

  storeToken({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });

  return {
    success: true,
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
}

export function logout(): void {
  deleteToken();
}
