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
import { useFetcher } from "@/hooks/use-fetcher";
import { NoteType, StatusType } from "@/lib/types";
import { useShowToast } from "@/hooks/use-show-toast";

export default function PostCreate({ btnLabel }: { btnLabel: string }) {
  const { fetcher } = useFetcher<NoteType>("/note");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetcher({
        method: "POST",
        payload: {
          content,
        },
      });

      if (!res.success || !res.data) {
        useShowToast(StatusType.ERROR, res.message || "Failed to create post");
      }
    } catch (error) {
      useShowToast(
        StatusType.ERROR,
        "An error occurred while creating the post",
      );
    } finally {
      setContent("");
      setIsLoading(false);
      useShowToast(StatusType.SUCCESS, "Post created successfully");
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
