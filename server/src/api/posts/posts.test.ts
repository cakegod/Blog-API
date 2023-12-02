import request from "supertest";
import {
	allPosts,
	draftedPostSlug,
	fakePostSlug,
	publishedPosts,
	publishedPostSlug,
	withLimit,
} from "./posts.fixture";
import { PostModel } from "./posts.model";
import { LIMIT } from "./posts.constants";
import { cleanUp, setupServer } from "../_shared/tests.util";
import { beforeEach, describe } from "vitest";

const app = setupServer();

beforeEach(async () => {
	await cleanUp();
});

describe("/posts", () => {
	describe("GET", () => {
		it("should return all posts sorted by newest when sort query is not provided", async () => {
			const res = await request(app).get("/posts");
			expect(res.status).to.equal(200);
			expect(res.body.at(0).title).to.equal(allPosts.at(-1)!.title);
			expect(res.body).toHaveLength(withLimit(allPosts.length));
		});

		it("should return all posts sorted by oldest when sort query is 'oldest'", async () => {
			const res = await request(app).get("/posts?sort=oldest");
			expect(res.status).to.equal(200);
			expect(res.body.at(0).title).to.equal(allPosts.at(0)!.title);
			expect(res.body).toHaveLength(withLimit(allPosts.length));
		});

		it("should send BAD REQUEST the status query is invalid", async () => {
			const res = await request(app).get(`/posts?sort=fooo`);
			expect(res.status).to.equal(400);
			expect(res.body).toHaveLength(1);
		});

		it("should return all posts with the specified status query when the status query is 'publish'", async () => {
			const res = await request(app).get(`/posts?status=publish`);
			expect(res.status).to.equal(200);
			expect(res.body).toHaveLength(withLimit(publishedPosts.length));
		});

		it("should return a limited number of posts when the limit query is provided", async () => {
			for (let i = 1; i < LIMIT; i++) {
				const res = await request(app).get(`/posts?limit=${i}`);
				expect(res.status).to.equal(200);
				expect(res.body).toHaveLength(
					i > allPosts.length ? allPosts.length : i,
				);
			}
		});

		it("should return a limited number of published posts when the limit and status queries are provided", async () => {
			const res = await request(app).get(`/posts?limit=2&status=publish`);
			expect(res.status).to.equal(200);
			expect(res.body).toHaveLength(withLimit(2));
		});

		it("should send BAD REQUEST the limit query when the value is 0", async () => {
			const res = await request(app).get(`/posts?limit=0`);
			expect(res.status).to.equal(400);
			expect(res.body).toHaveLength(1);
		});

		it("should send BAD REQUEST the limit query when limit query is superior to 10", async () => {
			const res = await request(app).get(`/posts?limit=11`);
			expect(res.status).to.equal(400);
			expect(res.body).toHaveLength(1);
		});
	});

	describe("POST", () => {
		it("should send BAD REQUEST when inputs are invalid", async () => {
			const res = await request(app).post("/posts");
			expect(res.status).to.equal(400);
		});

		it("should create a post when inputs are valid", async () => {
			const res = await request(app).post("/posts").type("form").send({
				title: "foo",
				content: "foo",
				description: "foo",
			});

			expect(res.status).to.equal(204);

			// to check if the post exists in the db
			expect(await PostModel.exists({ title: "foo" })).toBeTruthy();
		});
	});
});

describe("/posts/:slug", () => {
	describe("GET", () => {
		it("should return the post by slug", async () => {
			const res = await request(app).get(`/posts/${allPosts[1].slug}`);

			expect(res.status).to.equal(200);
			expect(res.type).to.match(/json/);
			expect(res.body.title).to.equal(allPosts[1].title);
		});

		it("should send NOT FOUND when the post does not exist", async () => {
			const res = await request(app).get(`/posts/foo`);

			expect(res.status).to.equal(404);
		});
	});

	describe("PUT", () => {
		it("should update the post fields", async () => {
			const res = await request(app)
				.put(`/posts/${allPosts[1].slug}`)
				.type("form")
				.send({
					title: "bar",
					content: "bar",
					description: "bar",
				});

			expect(res.status).to.equal(200);
			expect(res.body).toMatchObject({
				title: "bar",
				content: "bar",
				description: "bar",
			});

			// to check if the post is updated
			const updatedPost = await PostModel.findOne({
				title: "bar",
				content: "bar",
				description: "bar",
			});
			expect(updatedPost?.slug).to.equal(allPosts[1].slug);
		});

		it("should send NOT FOUND when the post does not exist", async () => {
			const res = await request(app).put("/posts/foo").type("form").send({
				title: "bar",
				content: "bar",
				description: "bar",
			});

			expect(res.status).to.equal(404);
		});

		describe("post status change", () => {
			// TODO: Improve this. I don't like this weird setup token variable usage on all tests.
			let token: string;

			beforeEach(async () => {
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

				token = res.body.token;
			});

			//

			it("should change the post status to 'publish'", async () => {
				const res = await request(app)
					.put(`/posts/${draftedPostSlug}`)
					.auth(token, { type: "bearer" })
					.send({ status: "publish" });

				expect(res.status).to.equal(200);
				expect(res.body.status).to.equal("publish");
			});

			it("should change the post status to 'draft'", async () => {
				const res = await request(app)
					.put(`/posts/${publishedPostSlug}`)
					.auth(token, { type: "bearer" })
					.send({ status: "draft" });

				expect(res.status).to.equal(200);
				expect(res.body.status).to.equal("draft");
			});

			it("should send NOT FOUND when the post does not exist", async () => {
				const res = await request(app)
					.put(`/posts/${fakePostSlug}`)
					.auth(token, { type: "bearer" })
					.send({ status: "publish" });

				expect(res.status).to.equal(404);
			});

			it("should send NOT FOUND when the status's value is invalid", async () => {
				const res = await request(app)
					.put(`/posts/${publishedPostSlug}`)
					.auth(token, { type: "bearer" })
					.send({ status: "invalid" });

				expect(res.status).to.equal(400);
			});

			it("should send BAD REQUEST when the status is not sent", async () => {
				const res = await request(app)
					.put(`/posts/${publishedPostSlug}`)
					.auth(token, { type: "bearer" });

				expect(res.status).to.equal(400);
			});

			it("should send UNAUTHORIZED when jwt token not sent", async () => {
				const res = await request(app)
					.put(`/posts/${publishedPostSlug}`)
					.send({ status: "publish" });

				expect(res.status).to.equal(401);
			});
		});
	});
	describe("DELETE", () => {
		it("should delete the post", async () => {
			const res = await request(app).delete(`/posts/${allPosts[1].slug}`);

			expect(res.status).to.equal(204);
			expect(await PostModel.exists({ slug: allPosts[1].slug })).to.be
				.null;
		});

		it("should send NOT FOUND when the post does not exist", async () => {
			const res = await request(app).delete(`/posts/foo`);

			expect(res.status).to.equal(404);
		});
	});
});
