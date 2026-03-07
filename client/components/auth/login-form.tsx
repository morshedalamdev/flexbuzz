"use client";

import { login } from "@/actions/auth";
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
import { useActionState } from "react";
import { Spinner } from "../ui/spinner";

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <form action={action}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            aria-invalid={!!state?.errors?.password}
          />
          {state?.errors?.password && (
            <FieldError>{state.errors.password}</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : ""}Login
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
