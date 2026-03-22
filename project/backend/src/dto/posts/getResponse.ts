import type { Post } from "../../db/schema.js";

export interface GetResponse {
  posts: Post[];
  next_cursor: number | null;
}
