import express, { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import logger from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import blogRouter from './routes/blog';
import indexRouter from './routes/index';
import CHttpException from './types';

/* --- INIT DOTENV --- */
config();

/* --- DATABASE CONNECTION --- */
const mongoDB = process.env.MONGO_URI!;
mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* --- INIT EXPRESS --- */
const app = express();

/* --- CORS --- */
app.use(cors());

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

/* --- ROUTES --- */
app.use('/', indexRouter);
app.use('/blog', blogRouter);

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
