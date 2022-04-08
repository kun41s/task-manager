require("dotenv").config();
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const mongoose = require("mongoose");


const port = 3000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log("Server running on port",port, "...");
        })
    } catch (error) {
        console.log(error);
    }
}

start();
