import { CrawlerBuilder } from "src/application/builders/crawler.builder";
import { RunCrawlerController } from "src/application/controllers/crawler/run-crawler.controller";
import { IController } from "src/domain/ports/controllers";

export const makeRunCrawlerFactory = (): IController => {
  const crawlerBuilder = new CrawlerBuilder();
  return new RunCrawlerController(crawlerBuilder);
};
