import Post from "@/components/Post";
import { db } from "@/server/db";
import { communityTable, postTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    name: string;
  };
}) {
  const res = await db.query.communityTable.findMany({
    where: eq(communityTable.name, params.name),
    with: {
      post: {
        with: {
          community: true,
        },
      },
    },
  });

  const posts = res[0].post;
  return (
    <div className=" w-full flex flex-col items-center h-[calc(100vh-3rem)] ">
      <div className=" w-full gap-2 flex flex-col items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {`c/${res[0].name}`}
        </h2>
        <p>{res[0].description}</p>
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
        {posts.map((post) => (
          <Link
            className=" w-full max-w-4xl mx-4"
            key={`post-${post.id}`}
            href={`/post/${post.id}`}
          >
            <Post postData={post} />
          </Link>
        ))}
        {posts.map((post) => (
          <Link
            className=" w-full max-w-4xl mx-4"
            key={`post-${post.id}`}
            href={`/post/${post.id}`}
          >
            <Post postData={post} />
          </Link>
        ))}
        {posts.map((post) => (
          <Link
            className=" w-full max-w-4xl mx-4"
            key={`post-${post.id}`}
            href={`/post/${post.id}`}
          >
            <Post postData={post} />
          </Link>
        ))}
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
