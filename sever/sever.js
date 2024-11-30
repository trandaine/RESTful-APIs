const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
// const bcrypt = require('bcryptjs');
const session = require("express-session");
global.Vocab = require("./api/models/vocabModel");
// const User = require('./api/models/User');
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/authRoutes"); // Import auth routes
// require database connection
const dbConnect = require("./db/dbConnect");
const auth = require("./auth");


// const database = "vocab-builder";

// const email = "sa";
// const password = "Dai2018";
// const databasePort = 27017;
// const connectionStr = `mongodb://${email}:${password}@localhost:${databasePort}`;

// mongoose.set("strictQuery", true);
// const options = {
//     dbName: database,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// mongoose.connect(connectionStr, options, (error, connection) => {
//     if (error) {
//         console.error("Error connecting to MongoDB:", error);
//     } else {
//         console.log("Connected to MongoDB!");
//     }
// });



// CORS headers (Consider refining these for production)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// protect a particular endpoint from unauthenticated users
// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

// Authentication middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Use the auth routes
app.use("/user", authRoutes);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Vocab routes (assuming you have a separate vocabRoutes file)
const routes = require("./api/routes/vocabRoutes");
routes(app);
dbConnect();
app.listen(port);
console.log("Server started on: " + port);
