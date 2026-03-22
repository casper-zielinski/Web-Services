import type { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  time_stamp: timestamp().defaultNow(),
  likes: integer().default(0),
});

 
export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferSelectModel<typeof posts>;