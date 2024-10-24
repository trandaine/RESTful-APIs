var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    Task = require('./api/models/todoListModel');
    const mongoose = require("mongoose");
    const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sa:Dai2018@localhost:27017/', {
    dbName: 'Tododb',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);