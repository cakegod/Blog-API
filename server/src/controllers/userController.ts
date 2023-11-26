import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import { UserModel } from "../models/UserModel";

const userController = {
	postLogin: passport.authenticate("jwt", { session: false }),

	// postRegister: [
	// 	check('email', 'email must not be empty')
	// 		.not()
	// 		.isEmpty()
	// 		.trim()
	// 		.escape(),
	// 	check('password').exists(),
	// 	check(
	// 		'passwordConfirm',
	// 		'Both password and confirm password must be equal'
	// 	)
	// 		.exists()
	// 		.custom((value, { req }) => value === req.body.password),

	// 	(req: Request, res: Response, next: NextFunction) => {
	// 		const errors = validationResult(req);
	// 		if (!errors.isEmpty()) {
	// 			res.status(400).json({
	// 				errors: errors.array(),
	// 			});

	// 			return;
	// 		}

	// 		bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
	// 			if (err) {
	// 				return next(err);
	// 			}
	// 			const user = new User({
	// 				email: req.body.email,
	// 				password: hashedPassword,
	// 			});

	// 			user.save(_err => {
	// 				if (_err) {
	// 					return next(_err);
	// 				}

	// 				res.json(user);
	// 			});
	// 		});
	// 	},
	// ],
};

export default userController;
