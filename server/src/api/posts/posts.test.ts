import request from "supertest";
import express from "express";
import blogRouter from "./posts.routes";
import { PROJECTION } from "./posts.constants";
import { posts } from "./posts.fixture";
import { PostModel } from "./posts.model";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/posts", blogRouter);

beforeEach(async () => {
	await PostModel.deleteMany();
	await Promise.all(posts.map(post => new PostModel(post).save()));
});

describe("/posts", () => {
	it("GET should return the published posts with the projected fields, sorted by date in descending order", async () => {
		const res = await request(app).get("/posts");

		expect(res.status).to.equal(200);
		expect(res.type).to.match(/json/);
		expect(Object.keys(res.body[0])).to.include.members(PROJECTION);
		expect(res.body[0].title).to.equal(posts[2].title);
		expect(res.body).to.have.length(posts.length);
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

	it("DELETE should delete the post", async () => {
		const res = await request(app).delete(`/posts/${posts[1].slug}`);

		expect(res.status).to.equal(204);
		expect(await PostModel.exists({ slug: posts[1].slug })).to.be.null;
	});

	it("DELETE should return 404 when the post does not exist", async () => {
		const res = await request(app).delete(`/posts/foo`);

		expect(res.status).to.equal(404);
	});

	it("PATCH should publish the post", async () => {
		const res = await request(app).patch(`/posts/${posts[1].slug}`);

		expect(res.status).to.equal(200);
		expect(res.body[1].published).to.true;
	});
});
