import Post from "@/components/Post";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/server/db";
import Link from "next/link";

export default async function Home() {
  const posts = await db.query.postTable.findMany({
    with: {
      community: true,
    },
  });
  return (
    <main className="">
      <Navbar />
      <ScrollArea className="pt-4 w-full flex flex-col items-center h-[calc(100vh-3rem)] ">
        {posts.map((post) => (
          <Link key={`post-${post.id}`} href={`/post/${post.id}`}>
            <Post postData={post} />
          </Link>
        ))}
      </ScrollArea>
    </main>
  );
}
