const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {

    // Login a user
  async login(req, res) {
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
  },


  // Register a new user
  async register(req, res) {
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
    // req.session.user = { id: newUser._id, username: newUser.username, role: newUser.role }; 

    res.status(201).json({ message: 'User registered successfully', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  },


    // Logout a user
  logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'Logout successful' });
      });
  }
};

module.exports = authController;