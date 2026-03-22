import express from "express";
import { createPost, getPosts } from "../service/postService.js";
import type { GetRequest } from "../dto/posts/getRequest.js";
import type { GetResponse } from "../dto/posts/getResponse.js";
import type { NewPost } from "../db/schema.js";
import type { PostResponse } from "../dto/posts/postResponse.js";

const router = express.Router();
const apiUrl = "/posts";

router.get(apiUrl, async (req, res) => {
  const getRequest: GetRequest = {
    cursor: parseInt(req.query.cursor?.toString() || "") || 0,
    limit: parseInt(req.query.cursor?.toString() || "") || 10,
  };
  const posts = await getPosts(getRequest);
  const getResponse: GetResponse = {
    posts: posts,
    next_cursor: posts.at(-1)?.id ?? null,
  };
  return res.json(getResponse);
});

router.post(apiUrl, async (req, res) => {
  const newPost: NewPost = { text: req.body.text, likes: req.body.likes };
  const insertedNewPost = await createPost(newPost);
  return res.json({
    message: "Successfully created Post",
    insertedPost: insertedNewPost,
    receivedPost: newPost,
  } as PostResponse);
});

export default router;
