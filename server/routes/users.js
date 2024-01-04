import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { TokenVerification } from "../middleware/TokenVerification.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, firstName, password, lastName } = req.body;

    if (!firstName || !email || !password || !lastName)
      return res
        .status(400)
        .json({ error: `Please enter all the required field.` });

    const user = await User.findOne({ email });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be atleast 6 characters long" });
    }

    if (user) {
      return res.status(400).json({
        error: `user  already exists .`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    newUser.password = undefined;
    res.status(200).json({ user: newUser, token: token });
  } catch (error) {
    console.log("Register error ", error);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const passwordMatch = await bcrypt.compare(password, userExist?.password);

    if (!passwordMatch)
      return res.status(400).json({ error: "Invalid email or password!" });

    const payload = { _id: userExist._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const user = { ...userExist._doc, password: undefined };

    res.status(200).json({ user, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/checkUser", TokenVerification, async (req, res) => {
  res.status(200).json(req.user);
});
export default router;
