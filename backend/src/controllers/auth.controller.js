const User = require("../models/user.model");
const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await authService.hashPassword(password);

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      const token = authService.generateToken(newUser);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: { id: newUser._id, email: newUser.email },
      });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid body" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await authService.comparePassword(
        password,
        user.password
      );
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = authService.generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ error: "Error logging in user" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid body" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user" });
  }
};
