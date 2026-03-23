import type { Post } from "../../../backend/src/db/schema";
import useDate from "../hooks/useDate";

const PostCard = ({
  post,
  ref
}: {
  post: Post;
  ref: React.Ref<HTMLElement> | undefined 
}) => {
  const date = useDate(post.time_stamp);
  return (
    <article
      id={post.id.toString()}
      className="bg-white rounded-xl shadow p-4 hover:shadow-lg hover:bg-gray-50"
      ref={ref}
    >
      <p className="text-gray-700 text-sm">{post.text}</p>
      <div className="mt-3 flex items-center gap-1 text-gray-400 text-xs">
        <span>♥</span>
        <span>{post.likes} likes</span>
        <span className="ml-auto justify-self-end">{date}</span>
      </div>
    </article>
  );
};

export default PostCard;
