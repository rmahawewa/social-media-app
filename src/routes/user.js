const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests", userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;
		const connectionRequests = await ConnectionRequest.find({
			toUserId: loggedInUser._id,
			status: "interested",
		}).populate(
			"fromUserId",
			"firstName lastName photoUrl age gender about skills"
		);

		res.json({
			message: "Data fetched successfully",
			data: connectionRequests,
		});
	} catch (err) {
		res.status(400).send("Error: " + err.message);
	}
});

module.exports = userRouter;
