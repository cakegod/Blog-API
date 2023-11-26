import { NextFunction, Request, Response } from "express";
import { PostModel } from "../api/posts/posts.model";

const dashboardController = {
	getPosts: async (req: Request, res: Response, next: NextFunction) => {
		const post = await PostModel.find().sort({ date: -1 });
		res.json(post);
	},

	updatePost: (req: Request, res: Response, next: NextFunction) => {
		// PostModel.findByIdAndUpdate(
		// 	{ slug: req.params.slug },
		// 	{ $set: { published: !published } },
		// 	{},
		// 	err => {
		// 		if (err) {
		// 			return next(err);
		// 		}
		// 		res.status(200).end();
		// 	}
		// );
	},
};

export default dashboardController;
