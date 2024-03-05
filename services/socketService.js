import { createServer } from "http";
import { Server } from "socket.io";

export const socket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.join("comment-room");
    socket.on("comment-added", () => {
      socket.to("comment-room").emit("comment-added");
    });
    socket.join("like-room");
    socket.on("post-liked", () => {
      socket.to("like-room").emit("post-liked");
    });
    socket.join("post-room");
    socket.on("post-added", () => {
      socket.to("post-room").emit("post-added");
    });
    socket.on("post-deleted", () => {
      socket.to("post-room").emit("post-deleted");
    });
  });

  const port = 5001;
  httpServer.listen(port);
};
