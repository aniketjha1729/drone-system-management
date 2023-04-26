import { Request, Response } from "express";
import User from "../models/user-modal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authKey = process.env.SECRET_AUTH_KEY;

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(200)
      .json({ errors: [{ msg: "All fields are required" }] });
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const newuser = new User({
      name,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newuser.password, salt, async (err, hash) => {
        if (err) throw err;
        newuser.password = hash;
        await newuser.save();
        return res.status(200).json({ success: [{ msg: "Signup Success" }] });
      });
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: "User does not exists" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const userAuthToken = jwt.sign(
      {
        _id: user._id,
      },
      `${authKey}`,
      {
        expiresIn: "48h",
      }
    );
    return res.status(200).json({
      userAuthToken,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
