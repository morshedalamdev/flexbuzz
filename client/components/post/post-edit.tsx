"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Field, FieldGroup } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { PostType } from "@/lib/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { useState } from "react";
import { postStore } from "@/stores/post-store";
import { Spinner } from "../ui/spinner";

interface PostEditProps {
  post: PostType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PostEdit({ post, open, onOpenChange }: PostEditProps) {
  const isLoading = postStore((state) => state.isLoading);
  const updatePost = postStore((state) => state.updatePost);
  const [content, setContent] = useState(post?.content || "");
  const isDesktop = useMediaQuery();

  const handleSubmit = async () => {
    if (content.trim()) {
      await updatePost(post.id, content.trim());
      onOpenChange(false);
      setContent("");
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <InputGroup>
                <InputGroupTextarea
                  id="block-end-textarea"
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
                    Update
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Post</DrawerTitle>
        </DrawerHeader>
        <FieldGroup>
          <Field className="px-4">
            <Textarea
              className="max-h-60"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <DrawerFooter className="pt-2">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner /> : ""}
            Update
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
