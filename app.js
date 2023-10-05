import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import setPort from "./src/utils/manageEnv";
import config from "./src/config/database";
import database from "./src/config/database";
const { swaggerUi, swaggerSpec } = require("./src/config/server-doc");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v1/api-docs", swaggerUi.serve);
app.get("/api/v1/api-docs", swaggerUi.setup(swaggerSpec, { explorer: true }));

app.get("/api/v1", (req, res) => {
  res.send({
    message: "Welcome to shift plan",
  });
});

// const environment = app.get("env");
// const PORT = setPort(environment);

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

export default app;
