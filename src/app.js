const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Sachin",
        lastName: "Tendulkar",
        emailId: "sst@yahoo.com",
        password: "st@12345",
        // _id: "44445555698745245896",
    }

    // Creating a new instance of the User model
    const user = new User(userObj);

    // or
    // const user1 =new User({
    //     firstName: "Ravini",
    //     lastName: "Mahawewa",
    //     emailId: "rmahawewa@yahoo.com",
    //     password: "rdm@12345"
    // });
    try {
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
})

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
