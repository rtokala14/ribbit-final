"use server";

import { eq, like } from "drizzle-orm";
import { db } from "./db";
import { communityTable, postTable } from "./db/schema";

export async function filterCommunity(inputValue: string) {
  "use server";

  const community = await db
    .select({
      label: communityTable.name,
      value: communityTable.id,
    })
    .from(communityTable)
    .where(like(communityTable.name, `%${inputValue}%`))
    .limit(5);

  return community;
}

export async function getPost(postId: number) {
  const res = await db.query.postTable.findFirst({
    where: eq(postTable.id, postId),
    with: {
      community: true,
    },
  });

  return JSON.stringify({
    content: res,
  });
}
