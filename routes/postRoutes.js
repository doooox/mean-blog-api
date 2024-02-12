import express from "express";
import multer from "multer";

import {
  addPost,
  deletePost,
  getPosts,
  getPostsByCategory,
  getSinglePost,
  getUserPosts,
  updatePost,
} from "../controllers/postsController.js";
import { storage } from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/myposts", authMiddleware, getUserPosts);
postRouter.post(
  "/add",
  authMiddleware,
  multer({ storage: storage }).single("image"),
  addPost
);
postRouter.get("/:id", getSinglePost);
postRouter.delete("/delete/:id", authMiddleware, deletePost);
postRouter.put(
  "/update/:id",
  multer({ storage: storage }).single("image"),
  authMiddleware,
  updatePost
);
postRouter.get("/filter/:categoryId", getPostsByCategory);

export default postRouter;
