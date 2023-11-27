import request from "supertest";
import { PROJECTION } from "./posts.constants";
import {
	fakePostSlug,
	posts,
	publishedPostSlug,
	unpublishedPostSlug,
} from "./posts.fixture";
import { PostModel } from "./posts.model";
import { cleanUp, setupServer } from "../../tests.setup";

const app = setupServer();

describe("/posts", () => {
	it("GET should return the published posts with the projected fields, sorted by date in descending order", async () => {
		const res = await request(app).get("/posts");

		expect(res.status).to.equal(200);
		expect(Object.keys(res.body[0])).to.include.members(PROJECTION);
		expect(res.body[0].title).to.equal(posts[2].title);
		expect(res.body).to.have.length(
			posts.filter(post => post.published).length,
		);
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
		expect(await PostModel.exists({ title: "foo" })).to.not.be.null;
	});
});

describe("/posts/:slug", () => {
	it("GET should return the post", async () => {
		const res = await request(app).get(`/posts/${posts[1].slug}`);

		expect(res.status).to.equal(200);
		expect(res.type).to.match(/json/);
		expect(res.body.title).to.equal(posts[1].title);
	});

	it("GET should return 404 when the post does not exist", async () => {
		const res = await request(app).get(`/posts/foo`);

		expect(res.status).to.equal(404);
	});

	it("PUT should update the post", async () => {
		const res = await request(app)
			.put(`/posts/${posts[1].slug}`)
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
		expect(updatedPost?.slug).to.equal(posts[1].slug);
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
		const res = await request(app).delete(`/posts/${posts[1].slug}`);

		expect(res.status).to.equal(204);
		expect(await PostModel.exists({ slug: posts[1].slug })).to.be.null;
	});

	it("DELETE should return 404 when the post does not exist", async () => {
		const res = await request(app).delete(`/posts/foo`);

		expect(res.status).to.equal(404);
	});
});

describe("/:slug/publish-action", () => {
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

		token = res.body;
	});

	//

	it("POST should publish the post when the action's value is 'publish'", async () => {
		const res = await request(app)
			.put(`/posts/${unpublishedPostSlug}/publish-action`)
			.auth(token, { type: "bearer" })
			.send({ action: "publish" });

		expect(res.status).to.equal(200);
		expect(res.body.published).to.true;
	});

	it("POST should unpublish the post when the action's value is 'unpublish'", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}/publish-action`)
			.auth(token, { type: "bearer" })
			.send({ action: "unpublish" });

		expect(res.status).to.equal(200);
		expect(res.body.published).to.false;
	});

	it("POST should return 404 when the post does not exist", async () => {
		const res = await request(app)
			.put(`/posts/${fakePostSlug}/publish-action`)
			.auth(token, { type: "bearer" })
			.send({ action: "unpublish" });

		expect(res.status).to.equal(404);
	});

	it("POST should return 404 when the action's value is invalid", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}/publish-action`)
			.auth(token, { type: "bearer" })
			.send({ action: "invalid" });

		expect(res.status).to.equal(404);
	});

	it("POST should return 404 when the action is not sent", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}/publish-action`)
			.auth(token, { type: "bearer" });

		expect(res.status).to.equal(404);
	});

	it("POST should return 401 when jwt token not sent", async () => {
		const res = await request(app)
			.put(`/posts/${publishedPostSlug}/publish-action`)
			.send({ action: "publish" });

		expect(res.status).to.equal(401);
	});
});
