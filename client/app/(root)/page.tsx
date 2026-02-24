import { Button } from "@/components/ui/button";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex w-full min-h-[calc(100dvh-48px)] max-w-3xl p-3 mx-auto flex-col items-center justify-between bg-white dark:bg-black">
      <div className="text-sm border rounded-sm p-3 space-y-3 shadow-sm">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ipsam
          doloremque nemo debitis non harum molestiae, accusantium doloribus
          adipisci iusto, quis deleniti autem voluptas. Laborum sed deleniti
          iusto tempora voluptatibus.
        </p>

        <div className="flex gap-3">
          <Button variant="outline">
            <ThumbsUpIcon size={15} />
            Like (238)
          </Button>
          <Button variant="outline">
            <MessageCircleIcon size={15} />
            Comments (6)
          </Button>
        </div>
      </div>
    </main>
  );
}
