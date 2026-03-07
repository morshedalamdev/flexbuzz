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
import PostCreate from "./post-create";
import { Field, FieldGroup } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface PostEditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PostEdit({ open, onOpenChange }: PostEditProps) {
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <PostCreate btnLabel="Update" />
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
               <Textarea className="max-h-60" placeholder="What's on your mind?" />
          </Field>
        </FieldGroup>
        <DrawerFooter className="pt-2">
          <Button>Update</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
