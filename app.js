import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import socketIo from "socket.io";
import swaggerUi from "swagger-ui-express";
import socketIO from "./src/services/shift/shiftSocket";
import setPort from "./src/utils/manageEnv";
import routes from "./src/routes";
import swaggerDoc from "./docs";

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  path: "/socket.io"
});

console.log("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v1/api-docs", swaggerUi.serve);
app.get("/api/v1/api-docs", swaggerUi.setup(swaggerDoc, { explorer: true }));

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to shift plan"
  });
});

app.use("/api/v1", routes);
socketIO(io);
const environment = app.get("env");
const PORT = setPort(environment);

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

export default app;
