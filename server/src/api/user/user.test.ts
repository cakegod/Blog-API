import request from "supertest";
import { UserModel } from "./user.model";
import { setupServer } from "../../tests.setup";
import { describe } from "vitest";

const app = setupServer();

describe("/user/signup", () => {
	it("POST should signup user when inputs are valid", async () => {
		const res = await request(app).post("/user/signup").type("form").send({
			email: "cake@fake.com",
			password: "foo",
			passwordConfirm: "foo",
		});

		expect(res.status).to.equal(200);

		// Check if it exists in the db
		expect(await UserModel.exists({ email: "cake@fake.com" })).to.not.be
			.null;
	});
});

describe("/user/login", () => {
	it("POST should return the token on a successful login", async () => {
		const agent = request.agent(app);

		await agent.post("/user/signup").type("form").send({
			email: "cake@fake.com",
			password: "foo",
			passwordConfirm: "foo",
		});

		const res = await agent.post("/user/login").type("form").send({
			email: "cake@fake.com",
			password: "foo",
		});

		expect(res.status).to.equal(200);

		// Check if it exists in the db
		expect(await UserModel.exists({ email: "cake@fake.com" })).to.not.be
			.null;

		// token is present
		expect(res.body).toBeTypeOf("string");
		expect(res.body).toBeTruthy();
	});

	it("POST should return 400 on a failed login", async () => {
		const agent = request.agent(app);

		await agent.post("/user/signup").type("form").send({
			email: "cake@fake.com",
			password: "foo",
			passwordConfirm: "foo",
		});

		const res = await agent.post("/user/login").type("form").send({
			email: "cake@fake.com",
			password: "fooo",
		});

		expect(res.status).to.equal(401);
	});
});
