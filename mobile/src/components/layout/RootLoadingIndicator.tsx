import { Spinner } from "@/components/ui/spinner";
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
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full bg-gray-900/90 text-white px-3 py-2 flex items-center gap-2 shadow-lg">
        <Spinner className="size-4" />
        <span className="text-xs font-medium">Loading...</span>
      </div>
    </div>
  );
}
