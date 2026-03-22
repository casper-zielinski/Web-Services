import { gt } from "drizzle-orm";
import { db } from "../db.js";
import { posts } from "../db/schema.js";
import type { GetRequest } from "../dto/posts/getRequest.js";

export async function getPosts(getRequest: GetRequest) {
  return await db
    .select()
    .from(posts)
    .limit(getRequest.limit)
    .where(gt(posts.id, getRequest.cursor));
}
