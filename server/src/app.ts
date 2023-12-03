import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import logger from "morgan";
import helmet from "helmet";
import dot from "dotenv";
import cors from "cors";
import blogRouter from "./api/posts/posts.routes";
import userRouter from "./api/user/user.routes";
import CHttpException from "./types";
import passportConfig from "./setup/passport.setup";
import { setupDB } from "./setup/database.setup";

/* --- INIT DOTENV --- */
dot.config();

/* --- DATABASE CONNECTION --- */
(async () => setupDB(process.env.MONGO_URL!))();

/* --- INIT EXPRESS --- */
const app = express();

/* --- PARSERS --- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --- CORS --- */
app.use(cors());

/* --- LOGGER --- */
if (app.get("env") === "development") {
	app.use(logger("dev"));
}

/* --- SECURITY --- */
if (app.get("env") === "production") {
	app.use(helmet());
}

/* --- INIT PASSPORT --- */
passportConfig();

/* --- ROUTES --- */
app.use("/posts", blogRouter);
app.use("/user", userRouter);

/* --- CATCH 404 --- */
app.use((_req: Request, _res: Response, next: NextFunction) => {
	next(createHttpError(404));
});

/* --- ERROR HANDLE --- */
app.use((err: CHttpException, req: Request, res: Response) => {
	if (req.app.get("env") === "development") {
		res.locals.error = err;
	} else res.locals.error = {};
	res.locals.message = res.locals.error;

	res.status(err.status || 500);
	res.json("error");
});

export default app;
