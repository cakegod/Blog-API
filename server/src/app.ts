import express, { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import logger from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dot from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import userRouter from './routes/user';
import blogRouter from './routes/posts';
import indexRouter from './routes/index';
import dashboardRouter from './routes/dashboard';
import CHttpException from './types';
import passportConfig from './passport';

/* --- INIT DOTENV --- */
dot.config();

/* --- DATABASE CONNECTION --- */
mongoose.connect(process.env.MONGO_URL!);

mongoose.connection.on('error', err =>
	console.log(`MongoDB connection error: ${err}`),
);

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
});

/* --- INIT EXPRESS --- */
const app = express();

/* --- PARSERS --- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --- CORS --- */
app.use(cors());

app.use(session({ secret: 'cake', resave: false, saveUninitialized: false }));

/* --- LOGGER --- */
if (app.get('env') === 'development') {
	app.use(logger('dev'));
}

/* --- SECURITY --- */
if (app.get('env') === 'production') {
	app.use(helmet());
}

/* --- SAVE CURRENT USER IN LOCAL --- */
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

/* --- INIT PASSPORT --- */
passportConfig();
app.use(passport.session());

/* --- ROUTES --- */
app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);

/* --- CATCH 404 --- */
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createHttpError(404));
});

/* --- ERROR HANDLE --- */
app.use((err: CHttpException, req: Request, res: Response) => {
	if (req.app.get('env') === 'development') {
		res.locals.error = err;
	} else res.locals.error = {};
	res.locals.message = res.locals.error;

	res.status(err.status || 500);
	res.send('error');
});

export default app;
