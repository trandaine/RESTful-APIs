const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const session = require("express-session");
global.Vocab = require("./api/models/vocabModel");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/authRoutes"); // Import auth routes
const dbConnect = require("./db/dbConnect");
const auth = require("./auth");
const cors = require("cors");

// Configure CORS 
app.use(cors({
  origin: 'http://localhost:8080', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization', // Allow the Authorization header
}));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Use the auth routes
app.use("/user", authRoutes);

// Free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// Authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

// Vocab routes (assuming you have a separate vocabRoutes file)
const routes = require("./api/routes/vocabRoutes");
routes(app);

const translateRoutes = require('./api/routes/translateRoutes');
app.use('/translate-api', translateRoutes);

// Connect to the database
dbConnect();

// Start the server
app.listen(port, () => {
  console.log("Server started on: " + port);
});
