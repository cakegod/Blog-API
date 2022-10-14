import async from 'async';
import { Request, Response, NextFunction } from 'express';
import { body, check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import passport from 'passport';

import { CallbackError } from 'mongoose';
import { Post } from '../models/Post';

const postController = {
	getPosts: (req: Request, res: Response, next: NextFunction) =>
		Post.find({ $set: { published: true } }, "title description date readTime").exec((err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result);
		}),

	postPost: [
		check('title', 'Title must not be empty')
			.not()
			.isEmpty()
			.trim()
			.escape(),
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
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.json({
					title: req.body.title,
					description: req.body.description,
					content: req.body.content,
					errors: errors.array(),
				});
				return;
			}
			const post = new Post({
				title: req.body.title,
				description: req.body.description,
				content: req.body.content,
				readTime: Math.ceil(req.body.content.trim().split(/\s+/).length / 250) + ' min read',
				date: Date.now(),
			});

			post.save(err => {
				if (err) {
					return next(err);
				}
			});

			res.status(201).end();
		},
	],

	getPost: (req: Request, res: Response, next: NextFunction) => {
		Post.findById(req.params.postid).exec((err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result);
		});
	},

	putPost: [
		check('title', 'Title must not be empty')
			.not()
			.isEmpty()
			.trim()
			.escape(),
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
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					title: req.body.title,
					description: req.body.description,
					content: req.body.content,
					errors: errors.array(),
				});
				return;
			}
			const post = new Post({
				title: req.body.title,
				description: req.body.description,
				content: req.body.content,
				_id: req.body.id,
				date: req.body.date,
				published: true,
			});

			Post.findByIdAndUpdate(req.params.postid, post, {}, err => {
				if (err) {
					return next(err);
				}

				res.status(200).end();
			});
		},
	],
	deletePost: (req: Request, res: Response) =>
		Post.findByIdAndDelete(req.params.postid, (err: CallbackError) => {
			if (err) {
				return err;
			}
			res.status(200).end();
		}),
};

export default postController;
