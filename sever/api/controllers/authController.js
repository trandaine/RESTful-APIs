const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  // Login a user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          message: "Email not found",
        });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );


      res.status(200).json({
        message: "Login successful",
        email: user.email,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res
        .status(201)
        .json({
          message: "User registered successfully",
          user: req.session.user,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  },

  async me(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = authController;
