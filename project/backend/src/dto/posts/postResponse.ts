import type { Post } from "../../db/schema.js";

export interface PostResponse {
  posts: Post;
}
