import { db } from "@/server/db";
import { communityTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const dbRes = await db
    .select()
    .from(communityTable)
    .where(eq(communityTable.name, res.checkName));

  if (dbRes.length < 1) {
    return new NextResponse(
      JSON.stringify({
        isValid: true,
      })
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        isValid: false,
      })
    );
  }
}
