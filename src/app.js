console.log("Starting a new project"); 

const express = require("express");
const app = express();

// app.use((req, res) => {
//     res.send("Hello from the server");
// });

app.use("/gallery", (req, res) => {
    res.send("Hello, this is the gallery page");
});

app.use("/hello", (req,res) => {
    res.send("Hello hello hello");
});

app.use("/", (req, res) => {
    res.send("Hello, this is the home page");
});

app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});