import { Schema, model } from 'mongoose';
import { IComment, CommentSchema } from './Comment';

interface IPost {
	title: string;
	description: string;
	content: string;
	date: Schema.Types.Date;
	published: boolean;
	readTime: string;
	slug: string;
	comments: IComment[];
}

const PostSchema = new Schema<IPost>({
	title: { type: String, unique: true, required: true },
	description: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Schema.Types.Date, required: true, default: Date.now() },
	published: { type: Boolean, required: true, default: true },
	readTime: { type: String, required: true },
	slug: { type: String, required: true },
	comments: { type: [CommentSchema] },
});

const Post = model<IPost>('Post', PostSchema);

export { Post, IPost };
