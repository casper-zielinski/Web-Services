import type { NewPost } from "../db/schema.js";

export interface PostRequest {
  new_post: NewPost;
  cursor: number;
  limit: number;
}
