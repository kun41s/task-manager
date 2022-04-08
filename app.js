const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const errorHandlerMiddleware = require("./middleware/errorHandler");


//middleware
app.use(express.json());


//routes
app.use('/api/v1/tasks', tasks);

app.use((req, res) => {
    res.status(404).json({
        error: "Bad URL"
    })
})

app.use(errorHandlerMiddleware); 

module.exports = app;