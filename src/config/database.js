const mongoose = require('mongoose');


// Connect to the mongo db cluster
const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://rmahawewa:o0GKfBBLNzz7A6bZ@mongodb-nodejs.qt9xysh.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
