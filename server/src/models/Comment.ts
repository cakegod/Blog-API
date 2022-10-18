import { Schema, model } from 'mongoose';
import { IUser } from './User';

interface IComment {
	author: IUser;
	content: string;
	date: Schema.Types.Date;
}

const CommentSchema = new Schema<IComment>({
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	content: { type: String, required: true },
	date: { type: Schema.Types.Date, required: true, default: Date.now() },
});

const Comment = model<IComment>('Comment', CommentSchema);

export { Comment, IComment, CommentSchema };
