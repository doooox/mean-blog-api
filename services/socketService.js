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
  });

  const port = 5001;
  httpServer.listen(port);
};
