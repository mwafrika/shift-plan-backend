import shiftApiObject from "./shiftDoc";
import userApiObject from "./userDoc";

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    version: "0.0.1",
    title: "Welcome to Shift plan APIs",
    description:
      "This is a shift plan API that allows users to create and manage their shifts"
  },
  servers: [
    {
      url: process.env.API_URL,
      description: process.env.DESCRIPTION
    }
  ],
  paths: { ...userApiObject, ...shiftApiObject }
};

export default swaggerConfig;
