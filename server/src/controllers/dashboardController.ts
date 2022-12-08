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

}

export default dashboardController