import request from "supertest";
import { UserModel } from "./user.model";
import { beforeEach, describe } from "vitest";
import { cleanUp, setupServer } from "../_shared/tests.util";

const app = setupServer();

beforeEach(async () => {
	await cleanUp();
});

describe("/user/signup", () => {
	describe("POST", () => {
		it("should signup user when inputs are valid", async () => {
			const res = await request(app)
				.post("/user/signup")
				.type("form")
				.send({
					email: "cake@fake.com",
					password: "foo",
					passwordConfirm: "foo",
				});

			expect(res.status).to.equal(200);

			// Check if it exists in the db
			expect(await UserModel.exists({ email: "cake@fake.com" })).to.not.be
				.null;
		});

		it("should send BAD REQUEST when the email already exists", async () => {
			await request(app).post("/user/signup").type("form").send({
				email: "cake@fake.com",
				password: "foo",
				passwordConfirm: "foo",
			});

			const res = await request(app)
				.post("/user/signup")
				.type("form")
				.send({
					email: "cake@fake.com",
					password: "foo",
					passwordConfirm: "foo",
				});

			expect(res.status).to.equal(400);
			expect(res.header["content-type"]).toMatch(/json/);
			expect(res.body).toMatchObject({ error: {} });
		});

		describe("should send BAD REQUEST when inputs are invalid", () => {
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
				expect(res.header["content-type"]).toMatch(/json/);
				expect(res.body).toMatchObject({ errors: {} });
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
				expect(res.header["content-type"]).toMatch(/json/);
				expect(res.body).toMatchObject({ errors: {} });
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
				expect(res.header["content-type"]).toMatch(/json/);
				expect(res.body).toMatchObject({ errors: {} });
			});
		});
	});
});

describe("/user/login", () => {
	describe("POST", () => {
		it("should send the token on a successful login", async () => {
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
			expect(
				await UserModel.exists({ email: "cake@fake.com" }),
			).toBeTruthy();

			// token is present
			expect(res.body.token).toBeTypeOf("string");
		});

		describe("should send UNAUTHORIZED on a failed login", () => {
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
});
