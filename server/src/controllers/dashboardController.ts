import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';

const dashboardController = {
	getPosts: (req: Request, res: Response, next: NextFunction) =>
		Post.find()
			.sort({ date: -1 })
			.exec((err, result) => {
				if (err) {
					return next(err);
				}
				res.json(result);
			}),

	updatePost: (req: Request, res: Response, next: NextFunction) =>
		Post.findByIdAndUpdate({ slug: req.params.slug }, { $set: { published: !published } }, {}, err => {
			if (err) {
				return next(err);
			}

			res.status(200).end();
		})

}

export default dashboardController