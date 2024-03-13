import { Express, Router } from "express";
import { makeExtractHighlightsControllerFactory } from "src/application/factories/controllers/extract-highlights.factory";
import { adaptRoute } from "../adapters/http.adapter";

export default (app: Express) => {
  const router = Router();

  router.get("/", adaptRoute(makeExtractHighlightsControllerFactory()));

  app.use("/crawler", router);
};
