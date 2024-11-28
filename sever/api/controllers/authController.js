const User = require('..\models\User.js');
const bcrypt = require('bcryptjs');

const authController = {
  async login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
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
          username: user.username,
          role: user.role,
        };
        res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
  },

  async register(req, res) {
    try {
        const { username, email, password } = req.body;
  
        // Check if user already exists
        const existingUser = await User.findOne({$or: [{ username }]});
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
    
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create a new user
        const newUser = new User({
          username,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        // You can optionally log in the user automatically after registration
      //   req.session.user = { id: newUser._id, username: newUser.username, role: newUser.role }; 
    
        res.status(201).json({ message: 'User registered successfully', user: req.session.user });
    } catch (error) {
      // ... (error handling)
    }
  },

  logout(req, res) {
    // ... (logout logic from server.js)
  }
};

module.exports = authController;