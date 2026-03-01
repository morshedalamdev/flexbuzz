"use client";

import PostItem from "@/components/post/post-item";
import { Button } from "@/components/ui/button";
import { UserDialog } from "@/components/user/user-dialog";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  
  return (
    <Fragment>
      <UserDialog open={open} onOpenChange={setOpen} />
      <div className="relative flex flex-wrap gap-x-6 gap-y-2 w-full">
        <div>
          <h2 className="font-bold text-lg md:text-2xl">Morshed Alam</h2>
          <h3 className="text-sm">@morshedalam</h3>
        </div>
        <div>
          <p>
            <span className="font-semibold">Gender:</span> Male
          </p>
          <p>
            <span className="font-semibold">Age:</span> 25
          </p>
        </div>
        <p>Bio: Passionate about web development and open source projects.</p>
        <div className="absolute right-0">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setOpen(true)}
          >
            <PencilIcon />
          </Button>
        </div>
      </div>
      <div className="space-y-3 mt-5">
        <h2 className="font-bold text-lg">Posts</h2>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </Fragment>
  );
}
