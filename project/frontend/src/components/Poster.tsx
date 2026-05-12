import { useState, type Dispatch, type SetStateAction } from "react";
import { sendPostUtil } from "../utils/sendPost";
import ErrorComponent from "./ErrorComponent";
import type { Post } from "../../../backend/src/db/schema";

export const Poster = ({
  postSetter,
}: {
  postSetter: Dispatch<SetStateAction<Post[]>>;
}) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="m-2"
      onSubmit={(e) => {
        sendPostUtil(text, setText, setLoading, setError, e, postSetter);
      }}
    >
      <textarea
        name="newpost"
        id="newpost"
        className={`min-h-12 max-h-96 min-w-[25vw] w-100 max-w-[90vw] p-2 border-2 rounded hover:shadow-xl  
            ${loading ? "bg-gray-400 animate-pulse" : ""} 
            `}
        value={text}
        onChange={(e) => setText(e.target.value)}
        minLength={1}
        required
      ></textarea>
      <button
        disabled={text.length === 0}
        className="m-2 p-2 border rounded bg-blue-400/40 scale-110 hover:shadow-xl disabled:bg-gray-300 transition-colors transition-discrete"
      >
        🚀
      </button>
      {error && <ErrorComponent />}
    </form>
  );
};
