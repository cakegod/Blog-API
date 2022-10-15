import { Schema, model } from 'mongoose';

interface IPost {
	title: string;
	description: string;
	content: string;
	date: Schema.Types.Date;
	published: boolean;
	readTime: string;
	slug: string;
}

const PostSchema = new Schema<IPost>(
	{
		title: { type: String, unique: true, dropDups: true },
		description: String,
		content: String,
		date: { type: Schema.Types.Date, required: true, default: Date.now() },
		published: { type: Boolean, required: true, default: true },
		readTime: { type: String, required: true },
		slug: { type: String, required: true },
	},
	{ toJSON: { virtuals: true } }
);

// PostSchema.virtual('slug').get(function () {
// 	return this.title
// 		.toLowerCase()
// 		.replace(/ /g, '-')
// 		.replace(/[^\w-]+/g, '');
// });

const Post = model<IPost>('Post', PostSchema);

export { Post, IPost };
