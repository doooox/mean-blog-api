import express from "express";
import postRouter from "./postRoutes.js";
import authRouter from "./authRoutes.js";
import commentRouter from "./commentRoutes.js";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/auth", authRouter);
router.use("/comment", commentRouter);

export default router;
