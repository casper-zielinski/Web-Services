import express from "express";
import { getPosts } from "../service/postService.js";
import type { GetRequest } from "../dto/posts/getRequest.js";
import type { GetResponse } from "../dto/posts/getResponse.js";

const router = express.Router();

router.get("/posts", async (req, res) => {
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

export default router;
