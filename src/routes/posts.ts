import express from "express";

import { getPosts, createPosts, deletePost, updatePost} from "../controllers/posts";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
