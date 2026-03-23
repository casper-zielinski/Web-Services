import { useEffect, useState } from "react";
import type { Post } from "../../../backend/src/db/schema";
import { fetchPosts } from "../api/postsApi";
import type { GetRequest } from "../../../backend/src/dto/posts/getRequest";
import axios from "axios";

export interface UsePostApiProps {
  cursor: number | null;
  limit: number;
}

export function usePostsApi({ cursor, limit }: UsePostApiProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  useEffect(() => {
    if (cursor === null) return;

    const controller = new AbortController();

    async function getPosts() {
      setLoading(true);
      const getRequest = { cursor, limit } as GetRequest;
      try {
        const result = await fetchPosts(getRequest, controller.signal);
        setPosts((prev) => [...prev, ...result.posts]);
        setNextCursor(result.next_cursor);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPosts();

    return () => controller.abort();
  }, [cursor, limit]);

  return { loading, error, posts, nextCursor };
}
