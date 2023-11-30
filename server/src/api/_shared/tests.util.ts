import dot from "dotenv";
import express from "express";
import passportConfig from "../../setup/passport.setup";
import blogRouter from "../posts/posts.routes";
import userRouter from "../user/user.routes";
import { PostModel } from "../posts/posts.model";
import { UserModel } from "../user/user.model";
import { allPosts } from "../posts/posts.fixture";

function setupServer() {
	dot.config();
	const app = express();
	passportConfig();
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use("/posts", blogRouter);
	app.use("/user", userRouter);

	return app;
}

async function cleanUp() {
	await PostModel.deleteMany();
	await UserModel.deleteMany();
	await Promise.all(allPosts.map(post => new PostModel(post).save()));
}

export { setupServer, cleanUp };
