import { PostModel } from "./posts.model";

export const posts = [
	{
		title: "Introduction to JavaScript",
		description: "A brief overview of JavaScript programming language",
		content: "JavaScript is a versatile programming language...",
		date: "2021-01-01",
	},
	{
		title: "Getting Started with Node.js",
		description: "Learn how to begin using Node.js for backend development",
		content:
			"Node.js is an open-source, cross-platform JavaScript runtime environment...",
		date: "2022-01-01",
	},
	{
		title: "The Power of React Components",
		description: "Understanding the fundamentals of React components",
		content: "React allows developers to build encapsulated components...",
		date: "2023-01-01",
	},
].map(post => new PostModel(post));
