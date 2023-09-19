import express from "express";
import setupRoutes from "./routes";

const makeApp = async () => {
  const app = express();
  setupRoutes(app);

  return app;
};

export default makeApp;
