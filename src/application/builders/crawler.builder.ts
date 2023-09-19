import {
  ICrawler,
  ICrawlerAdapterPage,
  ICrawlerAdapterPuppeteer,
} from "src/domain/ports/adapters/crawler.interface";
import { ICrawlerBuilder } from "src/domain/ports/builders/crawler.interface";
import { CrawlerAdapterPuppeteer } from "src/infra/adapters/crawler.adapter";

export class CrawlerBuilder implements ICrawlerBuilder {
  private crawler: ICrawlerAdapterPuppeteer;

  private browser: ICrawler["browser"];

  private page: ICrawlerAdapterPage;

  constructor() {
    this.crawler = new CrawlerAdapterPuppeteer();
  }

  public async mount(): Promise<ICrawlerAdapterPage> {
    const browser = await this.crawler.setBrowser({
      headless: false,
      defaultViewport: {
        width: 1200,
        height: 800,
      },
    });

    const page = this.crawler.onPage(browser);

    await page.open();

    this.browser = browser;
    this.page = page;

    return page;
  }

  public async unmount(): Promise<void> {
    this.crawler.closeBrowser(this.browser);
  }

  public async goToUrl(endpoint: string): Promise<void> {
    await this.page.goToUrl(endpoint);
  }

  public async waitForLoadNetwork(): Promise<void> {
    await this.page.waitForLoadNetwork();
  }
}
