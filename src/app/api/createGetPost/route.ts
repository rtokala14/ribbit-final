import { db } from "@/server/db";
import { postTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const res = db
    .insert(postTable)
    .values({
      author: req.userId,
      content: req.content,
      title: req.title,
      communityId: req.communityId,
      username: req.username,
    })
    .then((res) => {
      return new NextResponse(
        JSON.stringify({
          postId: res.insertId,
        })
      );
    })
    .catch(() => {
      return new NextResponse(
        JSON.stringify({
          postId: null,
        })
      );
    });

  return res;
}
