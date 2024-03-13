import { CrawlerBuilder } from "src/application/builders/crawler.builder";
import { ExtractHighlightsCrawler } from "src/application/crawlers/extract-highlights.crawler";
import { IExtractHighlightsCrawler } from "src/domain/ports/crawlers/extract-highlights-crawler.interface";

export const makeExtractHighlightsCrawlerFactory =
  (): IExtractHighlightsCrawler => {
    const crawlerBuilder = new CrawlerBuilder();
    return new ExtractHighlightsCrawler(crawlerBuilder);
  };
