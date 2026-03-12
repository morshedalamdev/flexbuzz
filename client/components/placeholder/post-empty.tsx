import { RssIcon } from "lucide-react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

export default function PostEmpty({label}: {label?: string}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <RssIcon />
        </EmptyMedia>
        <EmptyTitle>{label || "No Post Posted Yet"}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
