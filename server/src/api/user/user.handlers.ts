import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "./user.model";

const validateUser = [
	check("email", "email must not be empty")
		.not()
		.isEmpty()
		.isEmail()
		.trim()
		.escape(),
	check("password").exists(),
	check("passwordConfirm", "Both password and confirm password must be equal")
		.exists()
		.custom((value, { req }) => value === req.body.password),
];

const postLogin = [
	passport.authenticate("login", { session: false }),
	(req: Request & { user: User }, res: Response) => {
		res.json(
			jwt.sign(
				{
					email: req.user.email,
					admin: req.user.admin,
					id: req.user.id,
				},
				"SECRET!",
			),
		);
	},
];

const postSignup = [
	...validateUser,
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		passport.authenticate("signup", { session: false })(req, res, next);

		res.status(200).end();
	},
];

export { postLogin, postSignup };
