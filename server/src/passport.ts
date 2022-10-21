import passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import bcrypt from 'bcryptjs';
import { User } from './models/User';

const passportConfig = () => {
	const verify: VerifyFunction = (username, password, done) => {
		User.findOne({ username }).exec((err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}
			bcrypt.compare(password, user.password, (_err, res) => {
				if (_err) {
					return done(_err);
				}
				if (res) {
					return done(null, user);
				}
				return done(null, false, { message: 'Incorrect password' });
			});
		});
	};

	const strategy = new LocalStrategy(verify);

	passport.use(strategy);

	interface PassportUser extends Express.User {
		id?: string;
	}

	passport.serializeUser((user: PassportUser, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).exec((err, user) => {
			done(err, user);
		});
	});
};

export default passportConfig;
