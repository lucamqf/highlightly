import * as puppeteer from "puppeteer";
import {
  IBrowserConfig,
  ICrawler,
  ICrawlerAdapterPage,
  ICrawlerAdapterPuppeteer,
} from "../../domain/ports/adapters/crawler.interface";
import { CrawlerAdapterHandlePage } from "./crawler-page.adapter";

export class CrawlerAdapterPuppeteer implements ICrawlerAdapterPuppeteer {
  private puppeteer: typeof puppeteer;

  constructor() {
    this.puppeteer = puppeteer;
  }

  public async setBrowser(data?: IBrowserConfig): Promise<ICrawler["browser"]> {
    return this.puppeteer.launch(data);
  }

  public async closeBrowser(browser: ICrawler["browser"]): Promise<void> {
    await browser.close();
  }

  public onPage(browser: ICrawler["browser"]): ICrawlerAdapterPage {
    return new CrawlerAdapterHandlePage(browser);
  }
}
