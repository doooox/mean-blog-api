import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";

export const getAllComments = async (req, res) => {
  const { postId } = req.params;
  if (!postId) res.status(400).json({ message: "Post Id is required" });

  try {
    const comments = await Comment.find({ post: postId })
      .populate("user", "email username")
      .sort({ createdAt: "descending" });

    if (!comments) {
      return res.status(404).json({ message: "No Comments found" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  const { title, text } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      title,
      text,
      user: userId,
      post: post._id,
    });

    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push(comment._id);
    await post.save();

    await comment.populate({ path: "user", select: "email username" });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
