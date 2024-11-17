import express from "express";
import User from "../models/userModal.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return res.send({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error in registeration", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    if (user.password !== password) {
      return res.send({
        success: false,
        message: "Wrong password",
      });
    }

    return res.send({
      success: true,
      email: user.email,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error in login", error);
  }
});

export default router;
