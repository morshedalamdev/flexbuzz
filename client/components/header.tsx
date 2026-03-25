"use client";

import { useState } from "react";
import { ICONS } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserDialog } from "./user/user-dialog";
import { logout } from "@/actions/auth";
import { authStore } from "@/stores/auth-store";

export default function Header() {
  const user = authStore((state) => state.user);
  const [editUser, setEditUser] = useState(false);

  return (
    <header className="sticky top-0 p-3 bg-white z-50">
      <div className="max-w-3xl w-full flex items-center justify-between mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl md:text-base"
        >
          <Image src={ICONS.logo} alt="Logo" className="w-8 md:w-5" />
          Flex Buzz
        </Link>
        <UserDialog open={editUser} onOpenChange={setEditUser} />
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-medium">
            @{user?.username || "Username"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/user/me">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditUser(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={logout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
