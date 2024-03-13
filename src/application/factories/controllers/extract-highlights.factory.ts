import { IController } from "src/domain/ports/controllers";
import { ExtractHighlightsController } from "src/application/controllers/extract-highlights.controller";
import { makeExtractHighlightsCrawlerFactory } from "../crawlers/extract-highlights-crawler.factory";

export const makeExtractHighlightsControllerFactory = (): IController => {
  const extractHighlightsCrawler = makeExtractHighlightsCrawlerFactory();

  return new ExtractHighlightsController(extractHighlightsCrawler);
};
