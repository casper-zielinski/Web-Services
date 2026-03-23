import { useState } from "react";
import { usePostsApi } from "../hooks/usePostsApi";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import PostCard from "./PostCard";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const FeedPage = () => {
  const [cursor, setCursor] = useState<number | null>(0);
  const { error, loading, nextCursor, posts } = usePostsApi({
    cursor: cursor,
    limit: 10,
  });

  const lastElementRef = useIntersectionObserver(() => {
    if (nextCursor) setCursor(nextCursor);
  });

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post Feed</h1>

      <main className="space-y-4">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            ref={index === posts.length - 1 ? lastElementRef : null}
          />
        ))}
        {loading && <LoadingComponent />}
        {error && <ErrorComponent />}
      </main>
    </div>
  );
};

export default FeedPage;
