import { db } from "../db.js";
import { posts } from "../db/schema.js";

export async function getPosts() {
  return await db.select().from(posts);
}
