import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { UserModel } from "./api/user/user.model";

interface PassportUser extends Express.User {
	id?: string;
}

const passportConfig = () => {
	passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email", passwordField: "password" },
			async (username, password, done) => {
				try {
					const user = await UserModel.findOne({ email: username });

					if (!user) {
						return done(null, false, {
							message: "Incorrect username",
						});
					}

					if (!(await bcrypt.compare(password, user.password))) {
						return done(null, false, {
							message: "Incorrect password",
						});
					}

					done(null, user);
				} catch (err) {
					done(err);
				}
			},
		),
	);

	passport.use(
		"signup",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			async (email, password, done) => {
				try {
					const user = await UserModel.create({ email, password });

					return done(null, user);
				} catch (error) {
					done(error);
				}
			},
		),
	);

	passport.use(
		"jwt",
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: "SECRET!",
			},
			async (token, done) => {
				const user = await UserModel.findById(token.id);

				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			},
		),
	);

	// passport.serializeUser((user: PassportUser, done) => {
	// 	done(null, user.id);
	// });
	//
	// passport.deserializeUser(async (id, done) => {
	// 	try {
	// 		const user = await UserModel.findById(id);
	// 		done(null, user);
	// 	} catch (err) {
	// 		done(err);
	// 	}
	// });
};

export default passportConfig;
