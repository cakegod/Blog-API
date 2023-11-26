import { InferSchemaType, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const UserModel = model("User", UserSchema);

type User = InferSchemaType<typeof UserSchema>;

export { UserModel, User };
