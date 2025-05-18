const express = require('express');
const { userAuth } = require("../middleware/auth.js");


const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("Sending a connection request");

    const user = req.user;

    res.send(user.firstName + " Sent an Connection Request!");
});

module.exports = requestRouter;