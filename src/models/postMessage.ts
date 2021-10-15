import { Schema, model } from "mongoose";

interface User {
	name: string;
	address: string;
	phone: string;
	email: string;
	selectedFile: string;
}

const postSchema = new Schema<User>({
	name: { type: String, required: true },
	address: String,
	phone: String,
	email: { type: String, required: true },
	selectedFile: String,
});

const PostMessage = model("PostMessage", postSchema);

export default PostMessage;
