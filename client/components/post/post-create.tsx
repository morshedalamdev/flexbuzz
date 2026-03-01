import { Field, FieldGroup } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";

export default function PostCreate() {
  return (
    <FieldGroup>
      <Field>
        <InputGroup>
          <InputGroupTextarea
            id="block-end-textarea"
            placeholder="What's on your mind?"
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton variant="default" size="sm" className="ml-auto">
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
}
