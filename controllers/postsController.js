import Post from "../models/PostModel.js";
import Category from "../models/CommentModel.js";

export const getPosts = async (req, res) => {
  try {
    const { pageSize, page } = req.query;
    const parsedPageSize = parseInt(pageSize);
    const parsedPage = parseInt(page);

    const posts = await Post.find()
      .sort({ createdAt: "descending" })
      .skip(parsedPageSize * (parsedPage - 1))
      .limit(parsedPageSize);

    const totalCount = await Post.countDocuments();

    if (!posts) {
      return res.status(404).json({ message: "No Posts Were Found" });
    }

    return res.status(200).json({ posts, totalCount });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.user.id;

  const userPosts = await Post.find({ author: userId });

  return res.status(200).json(userPosts);
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate([
      {
        path: "author",
        select: "email username",
      },
      { path: "categories" },
      {
        path: "comments",
        populate: {
          path: "user",
          select: "email username",
        },
      },
    ]);

    if (!post) return res.status(404).json({ message: "No Post Was Found" });

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching single post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    const user = req.user.id;
    const url = req.protocol + "://" + req.get("host");

    // const postCategories = await Promise.all(
    //   categories.map(async (category) => {
    //     return await category.findById(category._id);
    //   })
    // );
    // console.log(postCategories);
    const parsedCategories = JSON.parse(categories);

    const post = await Post.create({
      title,
      content,
      imagePath: url + "/images/" + req.file.filename,
      author: user,
      categories: parsedCategories,
    });

    if (!post) return res.status(400).json({ message: "Invalid Data." });

    return res.status(201).json(post);
  } catch (error) {
    console.error("Error adding post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const author = req.user.id;

    let imagePath = req.body.imagePath;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }

    const post = await Post.findOne({ _id: id, author: author });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you are not authorized to update this post",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.imagePath = imagePath || post.imagePath;

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "No Post Was Found" });
    }

    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();

    return res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
