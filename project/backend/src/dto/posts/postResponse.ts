import type { NewPost, Post } from "../../db/schema.js";

export interface PostResponse {
  insertedPost: Post;
  receivedPost: NewPost;
  message: string;
}
