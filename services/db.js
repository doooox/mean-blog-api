import mongoose from "mongoose";

export const connectDB = async () => {
  const dbName = "mongodb://localhost/mean-app";
  try {
    await mongoose.connect(dbName);
  } catch (error) {
    process.exit(1);
  }
};
