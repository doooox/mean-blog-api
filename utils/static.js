export const CorsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
  allowedHeaders: "Content-Type, Authorization",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

export const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
