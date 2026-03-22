import type { Post } from "../db/schema.js";

export interface PostResponse {
  posts: Post;
  next_cursor: number | null;
}
