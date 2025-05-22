const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const handleSignup = async (req, res) => {
  const data = req.body;

  bcrypt.hash(data.password, 10, async (err, hashedPassword) => {
    if (err) return res.status(500).send("Error in hashing password");

    const createdUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      age: data.age,
    })
      .then(() => {
        res.status(201).json({ message: "User created successfully" });
      })
      .catch((error) => {
        console.error("Something went wrong in creating User", error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    await User
      .findOne({ email })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).json({ message: "User not found" });
        }
  
        bcrypt.compare(password, foundUser.password, (err, isMatch) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while checking password" });
          }
  
          if (isMatch) {
            return res
              .status(200)
              .json({ message: "User logged in successfully" });
          } else {
            return res.status(401).json({ message: "Wrong password" });
          }
        });
      })
      .catch((error) => {
        console.error("Something went wrong while finding the user", error);
        res.status(500).json({ message: "Internal server error" });
      });
};

module.exports = { handleSignup, handleLogin };
