import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: { type: Boolean, default: false },
});

const UserModel = model("User", UserSchema);
type User = InferSchemaType<typeof UserSchema>;
export { UserModel, User };
