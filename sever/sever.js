const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bcrypt = require('bcryptjs');
const session = require('express-session');
global.Vocab = require('./api/models/vocabModel'); 
const User = require('./api/models/User');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/authRoutes'); // Import auth routes


const database = "vocab-builder";
const email = "sa";
const password = "Dai2018"; 
const databasePort = 27017;
const connectionStr = `mongodb://${email}:${password}@localhost:${databasePort}`; 

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

// CORS headers (Consider refining these for production)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Authentication middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '34d683bec1dd47ff7320d68599cf348f772988a03c06b5a07f5d54767a98345d', 
    resave: false,
    saveUninitialized: true
}));

// Use the auth routes
app.use('/user', authRoutes); 

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Vocab routes (assuming you have a separate vocabRoutes file)
const routes = require('./api/routes/vocabRoutes'); 
routes(app);

app.listen(port);
console.log('Server started on: ' + port);