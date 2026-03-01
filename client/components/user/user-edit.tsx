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
  return (
    <form action="">
      <FieldGroup>
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input type="text" placeholder="First Name" />
        </Field>
        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input type="text" placeholder="Last Name" />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="Email" />
        </Field>
        <Field>
          <FieldLabel>Gender</FieldLabel>
          <Select>
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
          <Input type="date" placeholder="Date of Birth" />
        </Field>
        <Field>
          <FieldLabel>Bio</FieldLabel>
          <Textarea placeholder="Tell a little bit about yourself" />
        </Field>
        <Field>
          <Button type="submit">Save changes</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
