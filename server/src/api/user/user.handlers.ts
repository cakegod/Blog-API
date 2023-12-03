import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User, UserModel } from "./user.model";
import { Document } from "mongoose";

const validateUser = () => [
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
	(req: Request & { user: User & Document }, res: Response) => {
		res.json({
			token: jwt.sign(
				{
					email: req.user.email,
					admin: req.user.admin,
					id: req.user.id,
				},
				process.env.JWT_SECRET!,
			),
		});
	},
];

const postSignup = [
	...validateUser(),
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({
					errors: errors.array(),
				})
				.end();
		}

		if (await UserModel.exists({ email: req.body.email })) {
			return res.status(400).json({ error: "The email already exists." });
		}

		const user = await UserModel.create({
			email: req.body.email,
			password: req.body.password,
		});

		if (!user) {
			return res.status(400).end();
		}

		res.status(200).end();
	},
];

export { postLogin, postSignup };
