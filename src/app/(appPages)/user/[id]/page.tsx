import Post from "@/components/Post";
import { db } from "@/server/db";
import { communityTable, postTable } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const res = await db.query.postTable.findMany({
    where: eq(postTable.username, params.id),
    with: {
      community: true,
    },
    orderBy: desc(postTable.createdAt),
  });

  const posts = res;
  return (
    <div className=" w-full flex flex-col items-center h-[calc(100vh-3rem)] ">
      <div className=" w-full gap-2 flex flex-col items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {`u/${params.id}`}
        </h2>
      </div>
      <div className=" w-full">
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
    </div>
  );
}
