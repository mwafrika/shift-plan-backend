import express from "express";
import "dotenv/config";
import cors from "cors";
import setPort from "./src/utils/manageEnv";
import AuthRoutes from "./src/routes/auth";
import CompanyRoutes from "./src/routes/company";


const { swaggerUi, swaggerSpec } = require("./src/config/server-doc");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v1/api-docs", swaggerUi.serve);
app.get("/api/v1/api-docs", swaggerUi.setup(swaggerSpec, { explorer: true }));

app.get("/api/v1", (req, res) => {
  res.send({
    message: "Welcome to shift plan"
  });
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/companies", CompanyRoutes);

const environment = app.get("env");
const PORT = setPort(environment);

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

export default app;
