const express = require("express");
const connectDB = require("./config/database.js");
const validator = require('validator');
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    
    
    // const userObj = {
    //     firstName: "Virat",
    //     lastName: "Koli",
    //     emailId: "vk@yahoo.com",
    //     password: "kolibhai",
        // _id: "44445555698745245896",
    // }

    // Creating a new instance of the User model
    // const user = new User(userObj);

    // or
    // const user1 =new User({
    //     firstName: "Ravini",
    //     lastName: "Mahawewa",
    //     emailId: "rmahawewa@yahoo.com",
    //     password: "rdm@12345"
    // });
    try {
        // if(!validator.isEmail(req.body.emailId)){
        //     throw new Error("Email is not valid");
        // }
        if(req.body.skills?.length > 10){
            throw new Error("Skills count can not exeed ten");
        }
        const user = new User(req.body);
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});

// Get user by email
app.get("/user", async (req, res) => {
    const useremail = req.body.emailId;

    try{
        const user = await User.findOne({ emailId: useremail });
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
        
        // const users = await User.find({ emailId: useremail });
        // if(users.length === 0){
        //     res.status(404).send("User not found");
        // }else{
        //     res.send(users);
        // }        
    }
    catch(err){
        res.status(400).send("Something went wrong ", err.message);
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {

    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("Not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong ", err.message);
    }
        
});

app.get("/userByID", async (req, res) => {
    let userID = req.body._id;
    try{
        const user = await User.findById(userID);
        if(user){
            res.send(user);
        }else{
            res.status(404).send("User not found");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong ", err.message);
    }    
});

// Delete user from DB
app.delete("/user", async (req, res) => {
    try{
        let userId = req.body.userId;
        let user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong ", err.message);
    }    
});

// Update user from DB 
app.patch("/user/:userId", async (req, res) => {
    let userId = req.params?.userId;
    let data = req.body;
    try{
        const ALLOWED_UPDATE = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATE.includes(k)
        );
        if (!isUpdateAllowed) {
            console.log("Update is not allowed");
            throw new Error("Update not allowed");
        }
        if(req.body.skills?.length > 10){
            throw new Error("Skills can not be more than 10");
        }
        let user = await User.findByIdAndUpdate({ _id: userId }, data, { 
            returnDocument: 'after',
            // runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");
    }
    catch(err){
        res.send(err.message);
    }
});

// Update user with email id
app.patch("/byUserEmail", async (req, res) => {
    let emailId = req.body.emailId;
    let data = req.body;
    console.log(emailId);
    try{
        let user = await User.findOneAndUpdate({ emailId: emailId }, data, { returnDocument: 'after' });
        console.log(user);
        res.send("User updated successfully.");
    }
    catch(err){
        res.status(400).send("Something went wrong. ", err.message);
    }
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
