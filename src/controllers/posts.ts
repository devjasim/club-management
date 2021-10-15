import { NextFunction, Request, Response } from "express";
import PostMessage from "../models/postMessage";
import mongoose from "mongoose";

export const getPosts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		if (error instanceof Error) {
			let errorMessage = res.status(404).json({ message: error.message });
		}
	}
};

export const createPosts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const post = req.body;

	const newPost = new PostMessage(post);

	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		if (error instanceof Error) {
			let errorMessage = res.status(409).json({ message: error.message });
			return errorMessage;
		}
	}
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	const { id: _id } = req.params;

	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with this ID")

	const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id},  { new: true });

	res.json(updatedPost);

}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	const { id: _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with this ID")

	await PostMessage.findByIdAndRemove(_id);

	res.json({message: "Post Deleted Successfully"})

}
