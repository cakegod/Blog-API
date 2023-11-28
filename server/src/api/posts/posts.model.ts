import { InferSchemaType, model, Schema } from "mongoose";
import { STATUS_STATES } from "./posts.constants";

// Need to set fields as required: false so they're inferred as optional. They'll automatically be created using required fields
// E.g. readTime is computed using the content field, which is a required field
const PostSchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		description: { type: String, required: true },
		content: { type: String, required: true },
		date: { type: Schema.Types.Date, required: true, default: Date.now },
		status: {
			type: String,
			required: true,
			default: "draft",
			enum: STATUS_STATES,
		},
		readTime: {
			type: String,
			default: function () {
				return `${Math.ceil(
					(this as Post).content.trim().split(/\s+/).length / 250,
				)} min read`;
			},
			required: false,
		},
		slug: {
			type: String,
			required: false,
			default: function () {
				return (this as Post).title
					.toLowerCase()
					.replace(/ /g, "-")
					.replace(/[^\w-]+/g, "");
			},
		},
	},
	{ strict: "throw" },
);

type Post = InferSchemaType<typeof PostSchema>;
const PostModel = model("Post", PostSchema);

export { PostModel, Post };
