import express from "express";
import { createPost, getPosts } from "../service/postService.js";
import type { GetRequest } from "../dto/posts/getRequest.js";
import type { GetResponse } from "../dto/posts/getResponse.js";
import type { NewPost } from "../db/schema.js";
import type { PostResponse } from "../dto/posts/postResponse.js";
import { validateCursor, validateLimit } from "../utils/cursorValidation.js";

const router = express.Router();
const apiUrl = "/posts";

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         text:
 *           type: string
 *           example: "Hello World"
 *         time_stamp:
 *           type: string
 *           format: date-time
 *           example: "2026-04-06T12:00:00.000Z"
 *         likes:
 *           type: integer
 *           example: 0
 *     GetResponse:
 *       type: object
 *       properties:
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'
 *         next_cursor:
 *           type: integer
 *           nullable: true
 *           example: 10
 *     PostResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Successfully created Post"
 *         insertedPost:
 *           $ref: '#/components/schemas/Post'
 *         receivedPost:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *             likes:
 *               type: integer
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a paginated list of posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: ID of the last post from the previous page (for cursor-based pagination)
 *         example: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts to return (default 10)
 *         example: 10
 *     responses:
 *       200:
 *         description: A paginated list of posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetResponse'
 *       500:
 *         description: Internal server error
 */
router.get(apiUrl, async (req, res, next) => {
  try {
    const getRequest: GetRequest = {
      cursor: validateCursor(req.query.cursor?.toString()),
      limit: validateLimit(req.query.limit?.toString()),
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

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "My first post"
 *               likes:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Post successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponse'
 *       400:
 *         description: Required fields missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Required fields missing"
 *                 receivedBody:
 *                   type: object
 *       500:
 *         description: Internal server error
 */
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
