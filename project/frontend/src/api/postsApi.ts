import axios from "axios";
import type { GetRequest } from "../../../backend/src/dto/posts/getRequest.js";
import type { GetResponse } from "../../../backend/src/dto/posts/getResponse.js";
import type { PostResponse } from "../../../backend/src/dto/posts/postResponse.js";
import type { NewPost } from "../../../backend/src/db/schema.js";

const apiUrl = `${import.meta.env.VITE_API_URL}/posts`;

export async function fetchPosts(
  getRequest: GetRequest,
  signal?: AbortSignal,
): Promise<GetResponse> {
  const { data } = await axios.get(apiUrl, {
    params: getRequest,
    signal,
  });
  return data;
}

export async function sendPost(newPost: NewPost): Promise<PostResponse> {
  const { data } = await axios.post(apiUrl, newPost);
  return data;
}
