import Category from "../models/categoriesModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    if (!categories) return res.status(404).json("No Categories Found!");
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
