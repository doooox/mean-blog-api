import express from "express";
import {
  LoginUser,
  RegisterUser,
  getUsers,
  logoutUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);
authRouter.post("/logout", authMiddleware, logoutUser);

export default authRouter;
