import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import type { NewPost, Post } from "../../../backend/src/db/schema";
import { sendPost } from "../api/postsApi";

export async function sendPostUtil(
  text: string,
  setText: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>,
  e: SubmitEvent<HTMLFormElement>,
  postSetter: Dispatch<SetStateAction<Post[]>>,
) {
  e.preventDefault();
  setText("");
  setLoading(true);
  setError(false);
  try {
    const newPost: NewPost = {
      text: text,
      likes: parseInt(Math.random().toString()),
      time_stamp: new Date(Date.now()),
    };
    const { insertedPost } = await sendPost(newPost);
    postSetter((prev) => [insertedPost, ...prev]);
  } catch (error) {
    console.error(error);
    setError(true);
  } finally {
    setLoading(false);
  }
}
