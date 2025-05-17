const express = require("express");
const connectDB = require("./config/database.js");
const validator = require('validator');
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { userAuth } = require("./middleware/auth.js");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    
    try {
        // Validation of data
        validateSignUpData(req);

        //Encrypting password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

    
        // if(!validator.isEmail(req.body.emailId)){
        //     throw new Error("Email is not valid");
        // }
        if(req.body.skills?.length > 10){
            throw new Error("Skills count can not exeed ten");
        }
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    
});

app.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;
        // Validation of data
        validateLoginData(req);

        const user = await User.findOne({ emailId: emailId });
        if(!user){
            throw new Error("Invalid credencials");
        }
        
        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword){
            // Create a JWT Token
            const token = await user.getJWT();

            //Add the token to the cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 3600000) });

            res.send("Login Successfull...");
        }
        else{
            throw new Error("Invalid credencials");
        }
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message );
    }
});

app.get("/profile", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.send("ERROR: " + err.message);
    }
    
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("Sending a connection request");

    const user = req.user;

    res.send(user.firstName + " Sent an Connection Request!");
});

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
