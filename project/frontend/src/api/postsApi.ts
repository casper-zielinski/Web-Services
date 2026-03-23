import axios from "axios";
import type { GetRequest } from "../../../backend/src/dto/posts/getRequest.js";
import type { GetResponse } from "../../../backend/src/dto/posts/getResponse.js";

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
