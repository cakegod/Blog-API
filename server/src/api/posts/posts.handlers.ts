import { NextFunction, Request, Response } from "express";
import { check, query, validationResult } from "express-validator";
import { PostModel } from "./posts.model";
import { LIMIT, PAGE, SORT_VALUES, STATUS_STATES } from "./posts.constants";

const validatePost = () => [
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

type Status = (typeof STATUS_STATES)[number];
type Sort = (typeof SORT_VALUES)[number];

interface CustomPostsRequest extends Request {
	query: {
		limit: string;
		page: string;
		status: Status;
		offset: string;
		sort: Sort;
	};
}

type Query = {
	status?: Status;
};

const validateQueries = () => [
	query(
		"status",
		`Invalid status value. Valid values: ${STATUS_STATES.join(", ")}`,
	)
		.isIn(STATUS_STATES)
		.optional(),
	query("sort", `Invalid sort value. Valid values: ${SORT_VALUES.join(", ")}`)
		.isIn(SORT_VALUES)
		.optional(),
	query("limit", `Invalid limit value. Min value: 1, Max value: ${LIMIT}.`)
		.isInt({ min: 1, max: 10 })
		.optional(),
];

const getPosts = [
	validateQueries(),
	async (req: CustomPostsRequest, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array()).end();
		}

		let {
			limit = LIMIT,
			page = PAGE,
			status,
			offset = 0,
			sort = "newest",
		} = req.query;

		let query: Query = {};
		if (status) query.status = status;

		const sorting = {
			newest: -1,
			oldest: 1,
		} as const;

		const posts = await PostModel.find(query)
			.sort({
				date: sorting[sort] ?? sorting.newest,
			})
			.limit(Number(limit))
			.skip((Number(page) - 1) * Number(limit) + Number(offset));

		res.json(posts);
	},
];

const postPost = [
	...validatePost(),
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
	// check if action is present
	(req: Request, _res: Response, next: NextFunction) => {
		if (req.body?.status) {
			next("route");
		} else {
			next();
		}
	},
	...validatePost(),
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

const changePostStatus = async (req: Request, res: Response) => {
	if (!STATUS_STATES.includes(req.body.status)) {
		return res.status(400).end();
	}

	const updatedPost = await PostModel.findOneAndUpdate(
		{ slug: req.params.slug },
		{ status: req.body.status },
		{ new: true },
	);

	if (!updatedPost) {
		return res.status(404).end();
	}

	res.status(200).json(updatedPost).end();
};

export { getPosts, postPost, getPost, putPost, deletePost, changePostStatus };
