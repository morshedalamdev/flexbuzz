import PostCreate from "@/components/post/post-create";
import PostItem from "@/components/post/post-item";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
  return (
    <Fragment>
      <PostCreate />
      <div className="space-y-3 mt-5">
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </Fragment>
  );
}
