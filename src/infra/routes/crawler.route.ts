import { Express, Router } from "express";
import { makeRunCrawlerFactory } from "src/application/factories/crawler/run-crawler.factory";
import { adaptRoute } from "../adapters/http.adapter";

export default (app: Express) => {
  const router = Router();

  router.get("/", adaptRoute(makeRunCrawlerFactory()));

  app.use("/crawler", router);
};
