"use client";

import { useState } from "react";
import { Field, FieldGroup } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { postStore } from "@/stores/post-store";

export default function PostCreate() {
  const isLoading = postStore((state) => state.isLoading);
  const createPost = postStore((state) => state.createPost);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (content.trim()) {
      await createPost(content.trim());
      setContent("");
    }
  };
  return (
    <FieldGroup>
      <Field>
        <InputGroup>
          <InputGroupTextarea
            id="block-end-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              variant="default"
              size="sm"
              className="ml-auto"
            >
              {isLoading ? <Spinner /> : ""}
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
}
