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
import { PostType } from "@/lib/types";
import { usePostStore } from "@/stores/post-store";

interface PostCreateProps {
  btnLabel?: string;
  post?: PostType;
}

export default function PostCreate({ btnLabel, post }: PostCreateProps) {
  const isLoading = usePostStore((state) => state.isLoading);
  const createPost = usePostStore((state) => state.createPost);
  const [content, setContent] = useState(post?.content || "");

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
              disabled={isLoading}
              variant="default"
              size="sm"
              className="ml-auto"
            >
              {isLoading ? <Spinner /> : ""}
              {btnLabel}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
}
