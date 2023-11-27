import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { PostModel } from "./posts.model";
import { PROJECTION } from "./posts.constants";

const validatePost = [
	check("title", "Title must not be empty").not().isEmpty().trim().escape(),
	check("description", "Description must not be empty")
		.not()
		.isEmpty()
		.trim()
		.escape(),
	check("content", "Content must not be empty")
		.not()
		.isEmpty()
		.trim()
		.escape(),
];

const getPosts = async (_req: Request, res: Response) => {
	const posts = await PostModel.find({ published: true }, PROJECTION).sort({
		date: -1,
	});

	res.json(posts);
};

const postPost = [
	...validatePost,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				title: req.body.title,
				description: req.body.description,
				content: req.body.content,
				errors: errors.array(),
			});
		}

		if (await PostModel.exists({ title: req.body.title })) {
			return res.status(400).json({
				errors: {
					title: "A post with that title already exists",
				},
			});
		}

		await PostModel.create({
			title: req.body.title,
			description: req.body.description,
			content: req.body.content,
		});

		res.status(204).end();
	},
];

const getPost = async (req: Request, res: Response) => {
	const post = await PostModel.findOne({ slug: req.params.slug });

	if (post) {
		res.json(post).end();
	} else {
		res.status(404).end();
	}
};

const putPost = [
	...validatePost,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				title: req.body.title,
				description: req.body.description,
				content: req.body.content,
				errors: errors.array(),
			});
		}

		const updatedPost = await PostModel.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true },
		);

		if (!updatedPost) {
			return res.status(404).end();
		}

		res.status(200).json(updatedPost).end();
	},
];

const deletePost = async (req: Request, res: Response) => {
	const post = await PostModel.findOneAndDelete({
		slug: req.params.slug,
	});

	if (!post) {
		return res.status(404).end();
	}

	res.status(204).end();
};

const togglePost = async (req: Request, res: Response) => {
	function actionResult(action: "publish" | "unpublish") {
		switch (action) {
			case "publish":
				return true;
			case "unpublish":
				return false;
		}
	}

	const isPublished = actionResult(req.body?.action);

	if (isPublished === undefined) {
		return res.status(404).end();
	}

	const updatedPost = await PostModel.findOneAndUpdate(
		{ slug: req.params.slug },
		{ published: isPublished },
		{ new: true },
	);

	if (!updatedPost) {
		return res.status(404).end();
	}

	res.status(200).json(updatedPost).end();
};

export { getPosts, postPost, getPost, putPost, deletePost, togglePost };