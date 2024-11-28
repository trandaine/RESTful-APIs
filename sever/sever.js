const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const User = require('./models/User'); // Import your User model
const bcrypt = require('bcryptjs');
const session = require('express-session');

global.Vocab = require('./api/models/vocabModel');

const mongoose = require("mongoose");
const bodyParser = require('body-parser');

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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.put('/api/words/:id', (req, res) => {
    // Handle PUT request
    res.json({ message: 'Word updated successfully' });
});

// Authentication
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: '34d683bec1dd47ff7320d68599cf348f772988a03c06b5a07f5d54767a98345d', // Replace with a strong secret
  resave: false,
  saveUninitialized: true
}));

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Successful login
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post('/user/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // You can optionally log in the user automatically after registration
    req.session.user = { id: newUser._id, username: newUser.username, role: newUser.role }; 

    res.status(201).json({ message: 'User registered successfully', user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
app.post('/user/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ message: 'Logout successful' });
  });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/vocabRoutes');
routes(app);

app.listen(port);

console.log('Server started on: ' + port);