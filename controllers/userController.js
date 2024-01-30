import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";
import { generateToken } from "../utils/helpers.js";

export const getUsers = async (req, res) => {
  const users = await User.find();

  return res.status(200).json(users);
};

export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.exists({ email });

  if (userExists) return res.status(400).json({ message: "Email Taken" });

  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  if (!user) return res.status(400).json({ message: "Invalid User Data" });

  return res.status(201).json({
    id: user._id,
    token: generateToken(user._id),
  });
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return errorMessage(400, res, "Invalid email or password!");
  const matchPassword = await bcryptjs.compare(password, user.password);
  if (!matchPassword)
    return errorMessage(400, res, "Invalid email or password!");

  return res.status(200).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

export const logoutUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndUpdate(userId, { token: null });
    if (!user) throw new Error("User not found");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    errorMessage(500, res, "Server error");
  }
};