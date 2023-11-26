import express from "express";
import userRouter from "./user.routes";
import request from "supertest";
import { UserModel } from "./user.model";
import passportConfig from "../../passport";

const app = express();
passportConfig();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRouter);

it("POST should signup user when inputs are valid", async () => {
	const agent = request.agent(app);
	const res = await agent.post("/user/signup").type("form").send({
		email: "cake@fake.com",
		password: "foo",
		passwordConfirm: "foo",
	});

	expect(res.status).to.equal(200);

	// Check if it exists in the db
	expect(await UserModel.exists({ email: "cake@fake.com" })).toBeTruthy();
});

it("POST LOGIN", async () => {
	const agent = request.agent(app);
	const res = await agent.post("/user/login").type("form").send({
		email: "cake@fake.com",
		password: "foo",
	});

	expect(res.status).to.equal(200);

	// Check if it exists in the db
	expect(await UserModel.exists({ email: "cake@fake.com" })).to.not.be.null;
});
