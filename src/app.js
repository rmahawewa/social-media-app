console.log("Starting a new project"); 

const express = require("express");
const app = express();

// Middleware to parse JSON bodies.  This is CRUCIAL for POST/PUT requests.
app.use(express.json()); // Add this line

// This will only handle GET call to /user
// app.get("/user*", (req, res) => {
//     res.send({ firstname:"Ravini", lastname:"Mahawewa" });
// });

// How to get information of the query parameters
// app.get("/user-new", (req, res) => {
//     console.log(req.query);
//     res.send({ firstname: "Ranbeer", lastname: "Kapoor" });
// });

//How to get information of the dynamic query parameters
// app.get("/user/:userID/:name/:code", (req, res) => {
//     console.log(req.params);
//     res.send({ firstname: "ShahRukh", lastname: "Khan" });
// });

//  app.post("/user", (req,res) => {
//     //Save data to the database;
//     res.send("Data successfully saved to the database");
//  });

//  app.delete("/user", (req,res) => {
//     res.send("User deleted successfully");
//  })

// this will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send("Hello, this is the home page");
// });

app.use("/user", (req, res, next) => {
    console.log("Handling the route user");
    // res.send("Response !!!");
    next();
},
    [(req, res, next) => {
        console.log("Handling the route user 2");
        // res.send("Response2 !!!");
        next(); 
    },
    (req, res, next) => {
        console.log("Handling the route user 3");
        res.send("Response3 !!!");
        // next();
    }]
);

app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});