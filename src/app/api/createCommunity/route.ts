import { db } from "@/server/db";
import { communityTable } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const req = await request.json();

  const res = await db
    .insert(communityTable)
    .values({
      name: req.commName,
      description: req.description,
      author: req.userId,
    })
    .then(() => {
      return new NextResponse(
        JSON.stringify({
          isSuccess: true,
        })
      );
    })
    .catch(() => {
      return new NextResponse(
        JSON.stringify({
          isSuccess: false,
        })
      );
    });

  return res;
}
