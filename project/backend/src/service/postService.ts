import { lt, desc } from "drizzle-orm";
import { db } from "../config/db.js";
import { posts, type NewPost } from "../db/schema.js";
import type { GetRequest } from "../dto/posts/getRequest.js";

export async function getPosts({ cursor, limit }: GetRequest) {
  try {
    if (cursor <= 0) {
      return await db.select().from(posts).orderBy(desc(posts.id)).limit(limit);
    } else {
      return await db
        .select()
        .from(posts)
        .where(lt(posts.id, cursor))
        .orderBy(desc(posts.id))
        .limit(limit);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error getting posts");
  }
}

export async function createPost(newPost: NewPost) {
  try {
    return (await db.insert(posts).values(newPost).returning()).at(0);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating Post");
  }
}
