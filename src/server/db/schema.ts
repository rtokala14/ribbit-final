import { relations } from "drizzle-orm";
import {
  index,
  int,
  json,
  mysqlTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `ribbit_${name}`);

export const communityTable = mysqlTable(
  "communityTable",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique(),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow(),
    author: varchar("author", { length: 256 }),
  },
  (communities) => ({
    nameIdx: index("name_idx").on(communities.name),
    nameIdIdx: index("name_id_idx").on(communities.name, communities.id),
  })
);

export const communityRelations = relations(communityTable, ({ many }) => ({
  post: many(postTable),
}));

export const postTable = mysqlTable(
  "postTable",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }),
    content: varchar("content", { length: 1024 }),
    author: varchar("author", { length: 256 }),
    createdAt: timestamp("createdAt").defaultNow(),
    communityId: int("communityId"),
    username: varchar("username", { length: 25 }),
  },
  (posts) => ({
    titleIdx: index("title_idx").on(posts.title),
    authorIdx: index("author_idx").on(posts.author),
    cummunityIdx: index("community_idx").on(posts.communityId),
  })
);

export const postRelations = relations(postTable, ({ many, one }) => ({
  community: one(communityTable, {
    fields: [postTable.communityId],
    references: [communityTable.id],
  }),
}));
