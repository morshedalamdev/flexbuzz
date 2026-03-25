"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signup } from "@/actions/auth";
import { Spinner } from "../ui/spinner";
import { useShowToast } from "@/hooks/use-show-toast";
import { redirect } from "next/navigation";
import { authStore } from "@/stores/auth-store";

export function SignupForm() {
  const setUser = authStore((state) => state.setUser);
  const [state, action, isPending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.message) {
      useShowToast(state.status, state.message);
    }
    if (state?.status === "success" && state.token) {
      setUser(state.token as string);
      redirect("/");
    }
  }, [state]);
  return (
    <form action={action}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl md:text-2xl font-bold">Create your account</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="john_doe"
            required
            defaultValue={state?.username || undefined}
            aria-invalid={!!state?.errors?.username}
          />
          {state?.errors?.username && (
            <FieldError>{state.errors.username}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            defaultValue={state?.email || undefined}
            aria-invalid={!!state?.errors?.email}
          />
          {state?.errors?.email && (
            <FieldError>{state.errors.email}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            aria-invalid={!!state?.errors?.password}
          />
          {!state?.errors?.password && (
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          )}
          {state?.errors?.password && (
            <FieldError>
              <ul>
                {state.errors.password.map((err, idx) => (
                  <li key={idx} className="list-disc ml-5">
                    {err}
                  </li>
                ))}
              </ul>
            </FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="********"
            required
            aria-invalid={!!state?.errors?.confirmPassword}
          />
          {state?.errors?.confirmPassword && (
            <FieldError>{state.errors.confirmPassword}</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : ""}Create Account
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
// ddi3$jkfDFD
