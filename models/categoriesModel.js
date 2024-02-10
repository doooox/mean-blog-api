import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: { type: String, require: true },
});

export default mongoose.model("Category", CategoriesSchema);
