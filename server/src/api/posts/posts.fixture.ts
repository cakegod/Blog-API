import { Post, PostModel } from "./posts.model";

const data: Post[] = [
	{
		title: "Introduction to JavaScript",
		description: "A brief overview of JavaScript programming language",
		content: "JavaScript is a versatile programming language...",
		date: new Date("2021-01-01"),
		status: "publish",
	},
	{
		title: "Getting Started with Node.js",
		description: "Learn how to begin using Node.js for backend development",
		content:
			"Node.js is an open-source, cross-platform JavaScript runtime environment...",
		date: new Date("2022-01-01"),
		status: "publish",
	},
	{
		title: "The Power of React Components",
		description: "Understanding the fundamentals of React components",
		content: "React allows developers to build encapsulated components...",
		date: new Date("2023-01-01"),
		status: "publish",
	},
	{
		title: "Hey",
		description: "Hey description",
		content: "Some Content",
		date: new Date("2024-01-01"),
		status: "draft",
	},
];

const posts = data.map(post => new PostModel(post));

const publishedPostSlug: Post["slug"] = posts.find(
	post => post.status === "publish",
)!.slug;
const draftedPostSlug: Post["slug"] = posts.find(
	post => post.status === "draft",
)!.slug;
const fakePostSlug = "foo";

export { posts, publishedPostSlug, draftedPostSlug, fakePostSlug };
