import { Schema, model } from 'mongoose';

interface IUser {
	email: string;
	password: string;
	admin: boolean;
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: { type: Boolean, default: false },
});

const User = model<IUser>('User', UserSchema);

export { User, IUser };
