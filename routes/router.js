import express from "express";
import postRouter from "./postRoutes.js";
import authRouter from "./authRoutes.js";
import commentRouter from "./commentRoutes.js";
import categoriesRouter from "./categoriesRoutes.js";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/auth", authRouter);
router.use("/comment", commentRouter);
router.use("/categories", categoriesRouter);

export default router;
