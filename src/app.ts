import express, {Response, Request} from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import postRoutes from "./routes/posts";

const app = express();

dotenv.config();


var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use("/posts", postRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello to Club Management App")
});

const URL = process.env.CONNECTION_URL || "";

const PORT = process.env.PORT || 5000;

mongoose
	.connect(URL, {
		useUnifiedTopology: true,
	} as ConnectOptions)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch((err) => console.log(err.message));
