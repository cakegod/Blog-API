import { InferSchemaType, model, Schema } from 'mongoose';

const PostSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true,
	},
	description: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Schema.Types.Date, required: true, default: Date.now },
	published: { type: Boolean, required: true, default: true },
	readTime: {
		type: String,
		default: function () {
			return `${Math.ceil(
				(this as Post).content.trim().split(/\s+/).length / 250,
			)} min read`;
		},
	},
	slug: {
		type: String,
		required: true,
		default: function () {
			return (this as Post).title
				.toLowerCase()
				.replace(/ /g, '-')
				.replace(/[^\w-]+/g, '');
		},
	},
});

// PostSchema.pre('save', async function () {
// 	console.log(this);
// });

type Post = InferSchemaType<typeof PostSchema>;
const PostModel = model('Post', PostSchema);

export { PostModel, Post, PostSchema };
