import {
  index,
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
  })
);
