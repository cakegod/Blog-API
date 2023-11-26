import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { PostModel } from '../models/PostModel';

export const PROJECTION = ['title', 'description', 'date', 'readTime', 'slug'];

const validatePost = [
	check('title', 'Title must not be empty').not().isEmpty().trim().escape(),
	check('description', 'Description must not be empty')
		.not()
		.isEmpty()
		.trim()
		.escape(),
	check('content', 'Content must not be empty')
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
					title: 'A post with that title already exists',
				},
			});
		}

		await PostModel.create({
			title: req.body.title,
			description: req.body.description,
			content: req.body.content,
		});

		res.status(201).end();
	},
];

const getPost = async (req: Request, res: Response) => {
	const post = await PostModel.findOne({ slug: req.params.slug });
	res.json(post).end();
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

		const update = await PostModel.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true },
		);

		res.status(201).json(update).end();
	},
];

const deletePost = async (req: Request, res: Response) => {
	await PostModel.findOneAndDelete({
		slug: req.params.slug,
	});

	res.status(201).end();
};

export { getPosts, postPost, getPost, putPost, deletePost };
