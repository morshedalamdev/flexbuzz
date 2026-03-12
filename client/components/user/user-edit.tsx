import { userStore } from "@/stores/user-store";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
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

export default function UserEdit() {
  const currentUser = userStore((state) => state.currentUser);

  return (
    <form action="">
      <FieldGroup>
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input
            type="text"
            placeholder="First Name"
            defaultValue={currentUser?.profile.firstName || ""}
          />
        </Field>
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input
            type="text"
            placeholder="Last Name"
            defaultValue={currentUser?.profile.lastName || ""}
          />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="Email"
            defaultValue={currentUser?.email || ""}
          />
        </Field>
        <Field>
          <FieldLabel>Gender</FieldLabel>
          <Select defaultValue={currentUser?.profile.gender || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Date of Birth</FieldLabel>
          <Input
            type="date"
            placeholder="Date of Birth"
            defaultValue={currentUser?.profile.dob || ""}
          />
        </Field>
        <Field>
          <FieldLabel>Bio</FieldLabel>
          <Textarea
            placeholder="Tell a little bit about yourself"
            defaultValue={currentUser?.profile.bio || ""}
          />
        </Field>
        <Field>
          <Button type="submit">Save changes</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
