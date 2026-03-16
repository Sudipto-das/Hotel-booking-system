const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name userRegisterController
 * @route POST api/auth/register
 * @access Public
 */
const userRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password: _, ...safeUser } = savedUser.toObject();

    res.status(201).json({ message: "User registered successfully", user: safeUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

/**
 * @name userLoginController
 * @route POST api/auth/login
 * @access Public
 */
const userLoginController = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const user = await userModel.findOne({ email }).select("+password");;
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {

    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

/**
 * @name getUserProfileController
 * @route GET api/auth/profile
 * @access Private
 */

const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile", error: err.message });
  }
}

module.exports = { userRegisterController, userLoginController, getUserProfileController };