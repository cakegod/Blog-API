import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { setupDB } from "./database.setup";
import express, { Express } from "express";
import passportConfig from "./passport";
import blogRouter from "./api/posts/posts.routes";
import userRouter from "./api/user/user.routes";
import { PostModel } from "./api/posts/posts.model";
import { UserModel } from "./api/user/user.model";
import { posts } from "./api/posts/posts.fixture";

beforeAll(async () => {
	const mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	await setupDB(uri);
});

afterAll(async () => {
	await mongoose.connection.close();
});

export function setupServer() {
	const app = express();
	passportConfig();
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use("/posts", blogRouter);
	app.use("/user", userRouter);

	return app;
}

export async function cleanUp() {
	await PostModel.deleteMany();
	await UserModel.deleteMany();
	await Promise.all(posts.map(post => new PostModel(post).save()));
}

beforeEach(async () => {
	await cleanUp();
});
