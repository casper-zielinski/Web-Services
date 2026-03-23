import { gt } from "drizzle-orm";
import { db } from "../db.js";
import { posts, type NewPost } from "../db/schema.js";
import type { GetRequest } from "../dto/posts/getRequest.js";

export async function getPosts({ cursor, limit }: GetRequest) {
  try {
    return await db
      .select()
      .from(posts)
      .orderBy(posts.id)
      .limit(limit)
      .where(gt(posts.id, cursor));
  } catch (error) {
    throw new Error("Error getting posts");
  }
}

export async function createPost(newPost: NewPost) {
  try {
    return (await db.insert(posts).values(newPost).returning()).at(0);
  } catch (error) {
    throw new Error("Error creating Post");
  }
}
