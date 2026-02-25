"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageCircleIcon, SendHorizontalIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "../ui/input";

export default function CommentDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <MessageCircleIcon size={15} />
            Comments (6)
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <ul className="space-y-2">
            <li className="p-2 rounded-sm text-sm odd:bg-gray-50 even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">First Comment</li>
            <li className="p-2 rounded-sm text-sm odd:bg-gray-50 even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">Second Comment</li>
            <li className="p-2 rounded-sm text-sm odd:bg-gray-50 even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">Third Comment</li>
          </ul>
          <DialogFooter>
            <div className="w-full flex items-center gap-3">
              <Input placeholder="Write a comment..." className=""/>
              <Button><SendHorizontalIcon size={15} /></Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MessageCircleIcon size={15} />
          Comments (6)
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Comments</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
