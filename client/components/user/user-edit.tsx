"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { userStore } from "@/stores/user-store";
import { editProfile } from "@/actions/auth";
import { DatePickerInput } from "../ui/date-picker";
import { useShowToast } from "@/hooks/use-show-toast";
import { Spinner } from "../ui/spinner";
import { formatDate } from "@/lib/format-date";
import { useRouter } from "next/navigation";

export default function UserEdit() {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const [state, action, isPending] = useActionState(editProfile, undefined);
  const [date, setDate] = useState<Date | undefined>(
    user?.profile.dob || state?.dob || undefined,
  );

  useEffect(() => {
    if (state?.message) {
      useShowToast(state.status, state.message);
    }
    if(state?.status === "success") {
      router.refresh();
    }
  }, [state]);
  // Hey! I'm new here. Nice to meet you.
  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            type="text"
            id="first-name"
            name="firstName"
            placeholder="First Name"
            defaultValue={user?.profile.firstName || state?.firstName || ""}
          />
          {state?.errors?.firstName && (
            <FieldError>{state.errors.firstName}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input
            type="text"
            id="last-name"
            name="lastName"
            placeholder="Last Name"
            defaultValue={user?.profile.lastName || state?.lastName || ""}
          />
          {state?.errors?.lastName && (
            <FieldError>{state.errors.lastName}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            defaultValue={user?.username || state?.username || ""}
          />
          {state?.errors?.username && (
            <FieldError>{state.errors.username}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={user?.email || state?.email || ""}
          />
          {state?.errors?.email && (
            <FieldError>{state.errors.email}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <Select
            name="gender"
            defaultValue={user?.profile.gender || state?.gender || ""}
          >
            <SelectTrigger>
              <SelectValue id="gender" placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.gender && (
            <FieldError>{state.errors.gender}</FieldError>
          )}
        </Field>
        <DatePickerInput
          date={date}
          setDate={setDate}
          errors={state?.errors?.dob}
        />
        <input
          type="date"
          name="dob"
          value={formatDate(date)}
          readOnly
          className="hidden"
        />
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell a little bit about yourself"
            defaultValue={user?.profile.bio || state?.bio || ""}
          />
          {state?.errors?.bio && <FieldError>{state.errors.bio}</FieldError>}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : ""}Save changes
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
