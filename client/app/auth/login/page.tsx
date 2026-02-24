import { LoginForm } from "@/components/auth/login-form"
import { ICONS, IMAGES } from "@/lib/constant"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={IMAGES.login}
          alt="Login Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-end">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl md:text-base">
               <Image src={ICONS.logo} alt="Logo" className="w-8 md:w-5" />
               Flex Buzz
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
