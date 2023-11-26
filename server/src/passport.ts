import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { UserModel } from './models/UserModel';

const passportConfig = () => {
	const strategy = new LocalStrategy(async (username, password, done) => {
		try {
			const user = await UserModel.findOne({ username });

			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}

			if (!(await bcrypt.compare(password, user.password))) {
				return done(null, false, { message: 'Incorrect password' });
			}

			done(null, user);
		} catch (err) {
			done(err);
		}
	});

	passport.use(strategy);

	interface PassportUser extends Express.User {
		id?: string;
	}

	passport.serializeUser((user: PassportUser, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await UserModel.findById(id);
			done(null, user);
		} catch (err) {
			done(err);
		}
	});
};

export default passportConfig;
