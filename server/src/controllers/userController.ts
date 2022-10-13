import passport from 'passport';

const userController = {
	postLogin: passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	}),
};

export default userController;
