import express from "express";
import { getPosts } from "../service/postService.js";

const router = express.Router();

router.get("/posts", async (_, res) => {
  const posts = await getPosts();
  return res.json(posts);
});

export default router;
