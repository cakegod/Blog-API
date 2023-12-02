import express from "express";
import {
	changePostStatus,
	deletePost,
	getPost,
	getPosts,
	postPost,
	putPost,
} from "./posts.handlers";
import passport from "passport";

const router = express.Router();

router.get("/", ...getPosts);
router.post("/", postPost);

router.get("/:slug", getPost);
router.put("/:slug", putPost);
router.delete("/:slug", deletePost);
router.put(
	"/:slug",
	passport.authenticate("jwt", { session: false }),
	changePostStatus,
);

export default router;
