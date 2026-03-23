import express from "express";
import { createPost, getPosts } from "../service/postService.js";
import type { GetRequest } from "../dto/posts/getRequest.js";
import type { GetResponse } from "../dto/posts/getResponse.js";
import type { NewPost } from "../db/schema.js";
import type { PostResponse } from "../dto/posts/postResponse.js";

const router = express.Router();
const apiUrl = "/posts";

router.get(apiUrl, async (req, res, next) => {
  try {
    const getRequest: GetRequest = {
      cursor: parseInt(req.query.cursor?.toString() || "") || 0,
      limit: parseInt(req.query.limit?.toString() || "") || 10,
    };
    const posts = await getPosts(getRequest);
    const getResponse: GetResponse = {
      posts: posts,
      next_cursor: posts.at(-1)?.id ?? null,
    };
    return res.status(200).json(getResponse);
  } catch (error) {
    next(error);
  }
});

router.post(apiUrl, async (req, res, next) => {
  try {
    if (!req.body.text) {
      return res
        .status(400)
        .json({ message: "Required fields missing", receivedBody: req.body });
    }
    const newPost: NewPost = { text: req.body.text, likes: req.body.likes };
    const insertedNewPost = await createPost(newPost);
    return res.status(201).json({
      message: "Successfully created Post",
      insertedPost: insertedNewPost,
      receivedPost: newPost,
    } as PostResponse);
  } catch (error) {
    next(error);
  }
});

export default router;
