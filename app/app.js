import express from "express";
import router from "../routes/router.js";
import cors from "cors";
import { CorsOptions } from "../utils/static.js";
import { connectDB } from "../services/db.js";

export const createApp = () => {
  connectDB();
  const app = express();

  app.use("/images", express.static("assets/images"));
  app.use(cors(CorsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);

  return app;
};
