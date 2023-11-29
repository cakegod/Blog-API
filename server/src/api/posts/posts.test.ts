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
import { setupServer } from "../_shared/tests.util";

const app = setupServer();

describe("/posts", () => {
	it("GET should return all posts, sorted by newest date", async () => {
		const res = await request(app).get("/posts");

		expect(res.status).to.equal(200);
		expect(res.body.at(0).title).to.equal(allPosts.at(-1)!.title);
		expect(res.body).toHaveLength(withLimit(allPosts.length));
	});

	it("GET should return posts, sorted by newest", async () => {
		const res = await request(app).get("/posts?sort=oldest").expect(200);
		expect(res.status).to.equal(200);
		expect(res.body[0].title).to.equal(allPosts[0].title);
		expect(res.body[1].title).to.equal(allPosts[1].title);
		expect(res.body).toHaveLength(withLimit(allPosts.length));
	});

	it("POST should return 400 when inputs are invalid", async () => {
		const res = await request(app).post("/posts");
		expect(res.status).to.equal(400);
	});

	it("POST should create a post when inputs are valid", async () => {
		const res = await request(app).post("/posts").type("form").send({
			title: "foo",
			content: "foo",
			description: "foo",
		});

		expect(res.status).to.equal(204);

		// to check if the post exists in the db
		expect(await PostModel.exists({ title: "foo" })).toBeTruthy();
	});

	it("GET should return all posts with the specified status query", async () => {
		const res = await request(app).get(`/posts?status=publish`);
		expect(res.status).to.equal(200);
		expect(res.body).toHaveLength(withLimit(publishedPosts.length));
	});

	it("GET should return the number of posts with the specified limit query", async () => {
		for (let i = 1; i < LIMIT; i++) {
			const res = await request(app).get(`/posts?limit=${i}`);
			expect(res.status).to.equal(200);
			expect(res.body).toHaveLength(
				i > allPosts.length ? allPosts.length : i,
			);
		}
	});

	it("GET should return the number of posts with the specified status and limit queries", async () => {
		const res = await request(app).get(`/posts?limit=2&status=publish`);
		expect(res.status).to.equal(200);
		expect(res.body).toHaveLength(withLimit(2));
	});

	it("GET should return the number of posts with the specified offset", async () => {
		const res = await request(app).get(`/posts?offset=1&sort=oldest`);
		expect(res.status).to.equal(200);
		expect(res.body[0].title).toEqual(allPosts[1].title);
	});

	it("GET should ignore the limit query if limit query is 0", async () => {
		const res = await request(app).get(`/posts?limit=0`);
		expect(res.status).to.equal(200);
		expect(res.body).toHaveLength(allPosts.length);
	});

	it("GET should ignore the limit query if limit query is superior to 10", async () => {
		const res = await request(app).get(`/posts?limit=11`);
		expect(res.status).to.equal(200);
		expect(res.body).toHaveLength(allPosts.length);
	});
});

describe("/posts/:slug", () => {
	it("GET should return the post", async () => {
		const res = await request(app).get(`/posts/${allPosts[1].slug}`);

		expect(res.status).to.equal(200);
		expect(res.type).to.match(/json/);
		expect(res.body.title).to.equal(allPosts[1].title);
	});

	it("GET should return 404 when the post does not exist", async () => {
		const res = await request(app).get(`/posts/foo`);

		expect(res.status).to.equal(404);
	});

	it("PUT should update the post", async () => {
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

	it("PUT should return 404 when the post does not exist", async () => {
		const res = await request(app).put("/posts/foo").type("form").send({
			title: "bar",
			content: "bar",
			description: "bar",
		});

		expect(res.status).to.equal(404);
	});

	it("DELETE should delete the post", async () => {
		const res = await request(app).delete(`/posts/${allPosts[1].slug}`);

		expect(res.status).to.equal(204);
		expect(await PostModel.exists({ slug: allPosts[1].slug })).to.be.null;
	});

	it("DELETE should return 404 when the post does not exist", async () => {
		const res = await request(app).delete(`/posts/foo`);

		expect(res.status).to.equal(404);
	});
});

describe("/posts/:slug status change", () => {
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

	it("PUT should change the post status to 'publish'", async () => {
		const res = await request(app)
			.put(`/posts/${draftedPostSlug}`)
			.auth(token, { type: "bearer" })
			.send({ status: "publish" });

		expect(res.status).to.equal(200);
		expect(res.body.status).to.equal("publish");
	});

	it("PUT should change the post status to 'draft'", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}`)
			.auth(token, { type: "bearer" })
			.send({ status: "draft" });

		expect(res.status).to.equal(200);
		expect(res.body.status).to.equal("draft");
	});

	it("PUT should return 404 when the post does not exist", async () => {
		const res = await request(app)
			.put(`/posts/${fakePostSlug}`)
			.auth(token, { type: "bearer" })
			.send({ status: "publish" });

		expect(res.status).to.equal(404);
	});

	it("PUT should return 400 when the status's value is invalid", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}`)
			.auth(token, { type: "bearer" })
			.send({ status: "invalid" });

		expect(res.status).to.equal(400);
	});

	it("PUT should return 404 when the status is not sent", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}`)
			.auth(token, { type: "bearer" });

		expect(res.status).to.equal(400);
	});

	it("PUT should return 401 when jwt token not sent", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}`)
			.send({ status: "publish" });

		expect(res.status).to.equal(401);
	});
});
