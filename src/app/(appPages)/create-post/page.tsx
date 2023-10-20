import PostForm from "@/components/createPostForm";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="w-full px-4">
      <h1 className=" scroll-m-20 pb-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Create New Post
      </h1>
      <Separator className=" mb-3" />
      <PostForm />
    </div>
  );
}
