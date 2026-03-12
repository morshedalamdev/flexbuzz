import { Skeleton } from "../ui/skeleton";

export default function PostPlaceholder() {
  return (
    <div className="border rounded-sm p-3 space-y-3 shadow-sm">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-25 w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
