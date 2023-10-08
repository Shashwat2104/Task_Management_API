const express = require("express");
const { usermodel } = require("../Models/usermodel");
const userroute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a new user
userroute.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ msg: "User already exists. Please log in." });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 7);
    const newUser = new usermodel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ msg: "Registration successful" });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// Authenticate and log in a user
userroute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Email not found. Register first." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ msg: "Password is incorrect" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.secret, // Make sure "secret" is spelled correctly
      { expiresIn: "6hr" }
    );

    res.status(200).send({
      msg: "Login successful",
      username: user.username,
      token: token,
      userid: user._id,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = { userroute };
