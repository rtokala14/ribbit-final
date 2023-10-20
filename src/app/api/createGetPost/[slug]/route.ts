import { db } from "@/server/db";
import { postTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: number } }
) {
  const req = await request.json();

  const res = await db.query.postTable.findFirst({
    where: eq(postTable.id, params.slug),
  });

  return new NextResponse(
    JSON.stringify({
      content: res,
    })
  );
}
