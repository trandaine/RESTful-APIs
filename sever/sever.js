const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const session = require("express-session");
global.Vocab = require("./api/models/vocabModel");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/authRoutes");
const dbConnect = require("./db/dbConnect");
const auth = require("./auth");
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/user", authRoutes);

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

const routes = require("./api/routes/vocabRoutes");
routes(app);

const translateRoutes = require('./api/routes/translateRoutes');
app.use('/translate-api', translateRoutes);

dbConnect();

app.listen(port, () => {
  console.log("Server started on: " + port);
});
