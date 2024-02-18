import Post from "../models/PostModel.js";
import Like from "../models/likesModel.js";

export const likePosts = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (!existingLike) {
      const like = new Like({ post: postId, user: userId });
      await like.save();

      await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } });

      return res.status(200).json({ message: "Post Liked Successfully" });
    } else {
      const deletedLike = await Like.findOneAndDelete({
        post: postId,
        user: userId,
      });

      if (!deletedLike) {
        return res.status(404).json({ message: "Like not found" });
      }

      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: deletedLike._id },
      });

      return res.status(200).json({ message: "Post Disliked Successfully" });
    }
  } catch (error) {
    console.error("Error liking/disliking post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
