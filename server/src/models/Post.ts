import { Schema, model } from 'mongoose';

interface IPost {
	title: string;
	description: string;
	content: string;
	date: Schema.Types.Date;
	published: boolean;
}

const PostSchema = new Schema<IPost>({
	title: String,
	description: String,
	content: String,
	date: { type: Schema.Types.Date, required: true, default: Date.now() },
	published: { type: Boolean, required: true, default: true },
});

PostSchema.virtual('url').get(function () {
	return `/posts/${this._id}`;
});

const Post = model<IPost>('Post', PostSchema);

export { Post, IPost };
