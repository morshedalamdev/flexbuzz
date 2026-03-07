import { useFetcher } from "@/hooks/use-fetcher";
import { useShowToast } from "@/hooks/use-show-toast";
import { deleteToken, storeToken } from "@/lib/token";
import { LoginState, SignupState, StatusType } from "@/lib/types";
import { LoginSchema, SignupSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function signup(
  state: SignupState | undefined,
  formData: FormData,
): Promise<SignupState> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher<LoginResponse>("/auth/register");

  const validatedData = SignupSchema.safeParse(data);
  if (!validatedData.success) {
    useShowToast(
      StatusType.ERROR,
      "Validation failed. Please check the fields.",
    );
    return {
      errors: validatedData.error.flatten().fieldErrors,
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

  if (!res.success || !res.data) {
    useShowToast(StatusType.ERROR, res?.message as unknown as string);
    return {
      message: res?.message as unknown as string,
      username: validatedData.data.username,
      email: validatedData.data.email,
    };
  }

  storeToken({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });

  useShowToast(StatusType.SUCCESS, "Signup successful!");
  redirect("/");
}

export async function login(
  state: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher<LoginResponse>("/auth/login");

  const validatedData = LoginSchema.safeParse(data);
  if (!validatedData.success) {
    useShowToast(
      StatusType.ERROR,
      "Validation failed. Please check the fields.",
    );
    return {
      errors: validatedData.error.flatten().fieldErrors,
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

  if (!res.success || !res.data) {
    useShowToast(StatusType.ERROR, res?.message as unknown as string);
    return {
      message: res?.message as unknown as string,
      username: validatedData.data.username,
    };
  }

  storeToken({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });

  useShowToast(StatusType.SUCCESS, "Login successful!");
  redirect("/");
}

export function logout() {
  deleteToken();
  useShowToast(StatusType.SUCCESS, "Logged out successfully!");
  redirect("/login");
}
