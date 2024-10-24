var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    Task = require('./api/models/todoListModel');

const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const database = "todoList";
const username = "sa";
const password = "Dai2018";
const databasePort = 27017;
const connectionStr = `mongodb://${username}:${password}@localhost:${databasePort}`; 
mongoose.set("strictQuery", true); 
const options = { 
    dbName: database,
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}; 

mongoose.connect(connectionStr, options, (error, connection) => { 
    if (error) { 
        console.error("Error connecting to MongoDB:", error); 
    } else { 
        console.log("Connected to MongoDB!"); 
    } 
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);