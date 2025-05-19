const express = require("express");
const connectDB = require("./config/database.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
	.then(() => {
		console.log("Database connection established");
		app.listen(7777, () => {
			console.log("Server is successfully listening on port 7777 ...");
		});
	})
	.catch((err) => {
		console.error(err.message);
	});
