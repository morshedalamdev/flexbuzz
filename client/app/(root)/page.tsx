import PostItem from "@/components/post/post-item";

export default function HomePage() {
  return (
    <main className="flex w-full min-h-[calc(100dvh-48px)] max-w-3xl p-3 mx-auto flex-col items-center gap-3 bg-white dark:bg-black">
      <PostItem />
      <PostItem />
      <PostItem />
    </main>
  );
}
