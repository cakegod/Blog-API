import request from "supertest";
import { UserModel } from "./user.model";
import { describe } from "vitest";
import { setupServer } from "../_shared/tests.util";

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

	describe("POST should return when inputs are invalid", () => {
		it("missing confirm password", async () => {
			const res = await request(app)
				.post("/user/signup")
				.type("form")
				.send({
					email: "cake@fake.com",
					password: "foo",
					// Missing password
				});

			expect(res.status).to.equal(400);
		});

		it("unequal password and password confirm", async () => {
			const res = await request(app)
				.post("/user/signup")
				.type("form")
				.send({
					email: "cake@fake.com",
					password: "foo",
					passwordConfirm: "nope",
				});

			expect(res.status).to.equal(400);
		});

		it("invalid email", async () => {
			const res = await request(app)
				.post("/user/signup")
				.type("form")
				.send({
					email: "justCake",
					password: "foo",
					passwordConfirm: "foo",
				});

			expect(res.status).to.equal(400);
		});
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
		expect(res.header).toContain;

		// Check if it exists in the db
		expect(await UserModel.exists({ email: "cake@fake.com" })).toBeTruthy();

		// token is present
		expect(res.body.token).toBeTypeOf("string");
	});

	describe("POST should return 401 on a failed login", () => {
		it("wrong password", async () => {
			const agent = request.agent(app);

			await agent.post("/user/signup").type("form").send({
				email: "cake@fake.com",
				password: "foo",
				passwordConfirm: "foo",
			});

			const res = await agent.post("/user/login").type("form").send({
				email: "cake@fake.com",
				password: "wrongPassword",
			});

			expect(res.status).to.equal(401);
		});

		it("non-existent user", async () => {
			const res = await request(app)
				.post("/user/login")
				.type("form")
				.send({
					email: "doesNotExist",
					password: "foo",
				});

			expect(res.status).to.equal(401);
		});
	});
});
