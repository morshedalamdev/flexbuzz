import { Zap } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { usePostStore } from "@/store/post-store";
import { useUserStore } from "@/store/user-store";

export default function RootLoadingIndicator() {
  const authLoading = useAuthStore((state) => state.isLoading);
  const postLoading = usePostStore((state) => state.isLoading);
  const userLoading = useUserStore((state) => state.isLoading);

  const isRootLoading = authLoading || postLoading || userLoading;

  if (!isRootLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-r from-[#f1f1f4] via-white to-[#f1f1f4]" aria-busy="true">
      <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden rounded-[2rem]">
        <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-[#e8eef8]" />
        <div className="pointer-events-none absolute -left-20 -bottom-16 h-56 w-56 rounded-full bg-[#e8eef8]" />
        <div className="pointer-events-none absolute bottom-40 left-0 right-0 h-52 bg-[#eef3fb] opacity-90 [clip-path:ellipse(80%_100%_at_50%_100%)]" />
        <div className="pointer-events-none absolute bottom-28 left-0 right-0 h-52 bg-[#e7edf7] opacity-85 [clip-path:ellipse(75%_100%_at_50%_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-[#3a95ff] to-[#3a5bff] shadow-[0_12px_35px_rgba(58,91,255,0.25)]" role="img" aria-label="Flex Buzz logo">
            <Zap className="h-14 w-14 fill-white text-white" strokeWidth={2.4} />
          </div>

          <h1 className="mt-7 text-5xl font-extrabold tracking-tight text-[#0d1733]">Flex Buzz</h1>
          <p className="mt-4 text-lg font-medium text-[#8a94aa]">Connect • Share • Inspire</p>

          <div className="mt-28 flex flex-col items-center">
            <div
              className="h-14 w-14 animate-spin rounded-full border-[5px] border-[#7fa6ff]/30 border-t-[#3f78ff] border-r-[#3f78ff]"
              aria-hidden="true"
            />
            <span className="mt-5 text-2xl font-medium tracking-tight text-[#8a94aa]" aria-live="polite" role="status">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
