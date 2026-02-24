import { ICONS } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
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
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium">Username</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/user/me">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/user/me">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/user/me">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
