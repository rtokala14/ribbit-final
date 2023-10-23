import Post from "@/components/Post";
import Navbar from "@/components/navbar";
import { db } from "@/server/db";
import { postTable } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function Home() {
  const posts = await db.query.postTable.findMany({
    with: {
      community: true,
    },
    orderBy: desc(postTable.createdAt),
  });
  return (
    <main className="">
      <Navbar />
      <div className="pt-4 w-full flex flex-col items-center h-[calc(100vh-3rem)] ">
        {posts.map((post) => (
          <Link
            className=" w-full max-w-4xl mx-4"
            key={`post-${post.id}`}
            href={`/post/${post.id}`}
          >
            <Post postData={post} />
          </Link>
        ))}
      </div>
    </main>
  );
}
