import express, { response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import mongoose from "mongoose";
const router = express.Router();

router.post("/register", async (req, res) => {
  //register api
  const { username, password, email, phoneNumber } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (user) {
    return res.json({ message: "This user allready exists!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    email: email,
    phoneNumber: phoneNumber,
  });

  await newUser.save();
  res.json({ message: "User registered succesfully" });

  // res.json(user);
});

router.post("/login", async (req, res) => {
  //login api
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "This user does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(404)
      .json({ message: "Username or password is incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, "secret"); //the secret of a token is used for verifing if th etoken is still valid it is like a hash for the token
  res.json({ token, userId: user._id, userName: user.username });
});

router.get("/register/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ user, message: "user regiestered successfully" });
  } catch (err) {
    res.json(err);
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/changeCredentials", async (req, res) => {
  try {
    const { userId, username, password, email, phone } = req.body;
    console.log(username);
   // const userIdObj = mongoose.Types.ObjectId(userId);
    console.log(userIdObj);
    const user = await UserModel.findById(userId).catch((err) => {
      console.log(err);
      throw err; // Rethrow the error to be caught by the outer catch block
    });

    if (!user) {
      throw new Error("User not found");
    }
    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (email) user.email = email;
    if (phone) user.phoneNumber = phone;

    await user.save();

    res.json({ message: "user credentials modified succesfully!" });
  } catch (err) {
    res.json(err);
  }
});

export { router as userRouter };

// middleware for tokens
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorizations;

  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
