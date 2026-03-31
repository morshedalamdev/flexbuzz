import { useFetcher } from "@/hooks/use-fetcher";
import { useShowToast } from "@/hooks/use-show-toast";
import { deleteToken, storeToken } from "@/lib/token";
import {
  LoginStateType,
  ProfileEditStateType,
  SignupStateType,
  StatusType,
} from "@/lib/types";
import { LoginSchema, ProfileEditSchema, SignupSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function signup(
  state: SignupStateType | undefined,
  formData: FormData,
): Promise<SignupStateType> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher<LoginResponse>("/auth/register");

  const validatedData = SignupSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      status: StatusType.ERROR,
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
    return {
      status: StatusType.ERROR,
      message: res?.message as unknown as string,
      username: validatedData.data.username,
      email: validatedData.data.email,
    };
  }

  storeToken({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });

  return {
    status: StatusType.SUCCESS,
    message: "Signup successful!",
    token: res.data.accessToken,
  };
}

export async function login(
  state: LoginStateType | undefined,
  formData: FormData,
): Promise<LoginStateType> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher<LoginResponse>("/auth/login");

  const validatedData = LoginSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      status: StatusType.ERROR,
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
    return {
      status: StatusType.ERROR,
      message: res?.message as unknown as string,
      username: validatedData.data.username,
    };
  }

  storeToken({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });

  return {
    status: StatusType.SUCCESS,
    message: "Login successful!",
    token: res.data.accessToken,
  };
}

export function logout() {
  deleteToken();
  useShowToast(StatusType.SUCCESS, "Logged out successfully!");
  redirect("/login");
}

export async function updateProfile(
  state: ProfileEditStateType | unknown,
  formData: FormData,
): Promise<ProfileEditStateType> {
  const data = Object.fromEntries(formData.entries());
  const { fetcher } = useFetcher("/user/me");

  const validatedData = ProfileEditSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      status: StatusType.ERROR,
      errors: validatedData.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      firstName:
        typeof data.firstName === "string" ? data.firstName : undefined,
      lastName: typeof data.lastName === "string" ? data.lastName : undefined,
      username: typeof data.username === "string" ? data.username : undefined,
      email: typeof data.email === "string" ? data.email : undefined,
      gender: typeof data.gender === "string" ? data.gender : undefined,
      dob: typeof data.dob === "string" ? new Date(data.dob) : undefined,
      bio: typeof data.bio === "string" ? data.bio : undefined,
    };
  }

  const res = await fetcher({
    method: "PATCH",
    payload: {
      profile: {
        firstName: validatedData.data.firstName,
        lastName: validatedData.data.lastName,
        gender: validatedData.data.gender,
        dob: validatedData.data.dob,
        bio: validatedData.data.bio,
      },
      email: validatedData.data.email,
      username: validatedData.data.username,
    },
  });
  
  if (!res.success || !res.data) {
    return {
      status: StatusType.ERROR,
      message: res?.message as unknown as string,
      firstName:
        typeof data.firstName === "string" ? data.firstName : undefined,
      lastName: typeof data.lastName === "string" ? data.lastName : undefined,
      username: typeof data.username === "string" ? data.username : undefined,
      email: typeof data.email === "string" ? data.email : undefined,
      gender: typeof data.gender === "string" ? data.gender : undefined,
      dob: typeof data.dob === "string" ? new Date(data.dob) : undefined,
      bio: typeof data.bio === "string" ? data.bio : undefined,
    };
  }

  return {
    status: StatusType.SUCCESS,
    message: "Profile updated successfully!",
  };
}
