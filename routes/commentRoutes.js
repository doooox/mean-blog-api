import express from "express";
import {
  addComment,
  getAllComments,
} from "../controllers/commentsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.get("/:postId", getAllComments);
commentRouter.post("/:postId/add", authMiddleware, addComment);

export default commentRouter;
