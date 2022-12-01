import { Schema, model } from 'mongoose';

interface PostProps {
	title: string;
	description: string;
	content: string;
	date: Schema.Types.Date;
	published: boolean;
	readTime: string;
	slug: string;
}

const PostSchema = new Schema<PostProps>({
	title: { type: String, unique: true, required: true },
	description: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Schema.Types.Date, required: true, default: Date.now() },
	published: { type: Boolean, required: true, default: true },
	readTime: { type: String, required: true },
	slug: { type: String, required: true },
});

const Post = model<PostProps>('Post', PostSchema);

export { Post, PostProps };
