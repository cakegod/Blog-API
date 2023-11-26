import express from "express";
import {
	deletePost,
	getPost,
	getPosts,
	postPost,
	putPost,
} from "./posts.handlers";

const router = express.Router();

router.get("/", getPosts);
router.post("/", postPost);

router.get("/:slug", getPost);
router.put("/:slug", putPost);
router.delete("/:slug", deletePost);

export default router;
