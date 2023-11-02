import { Server } from "socket.io";

const ServerSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected");
    io.emit("userConnected", "A user has connected");

    socket.on("disconnect", () => {
      io.emit("userDisconnected", "A user has disconnected");
      console.log("A user disconnected");
    });
  });

  const emitShiftUpdated = (shiftId, updatedShift) => {
    const notification = `Shift ${shiftId} has been updated: ${updatedShift.date} at ${updatedShift.time}`;
    io.emit("shiftUpdated", notification);
  };

  const emitShiftDeleted = (shiftId) => {
    const notification = `Shift ${shiftId} has been deleted`;
    io.emit("shiftDeleted", notification);
  };

  return {
    emitShiftUpdated,
    emitShiftDeleted,
  };
};

export default ServerSocket;
