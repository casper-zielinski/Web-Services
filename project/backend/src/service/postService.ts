import { gt } from "drizzle-orm";
import { db } from "../db.js";
import { posts, type NewPost } from "../db/schema.js";
import type { GetRequest } from "../dto/posts/getRequest.js";

export async function getPosts(getRequest: GetRequest) {
  try {
    return await db
      .select()
      .from(posts)
      .limit(getRequest.limit)
      .where(gt(posts.id, getRequest.cursor));
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
