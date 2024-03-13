import { ElementHandle } from "puppeteer";
import {
  ICookie,
  ICrawler,
  ICrawlerAdapterPage,
} from "../../domain/ports/adapters/crawler.interface";

export class CrawlerAdapterHandlePage implements ICrawlerAdapterPage {
  private page: ICrawler["page"];

  // eslint-disable-next-line no-empty-function
  constructor(private browser: ICrawler["browser"]) {}

  public async open(): Promise<ICrawler["page"]> {
    const newPage = await this.browser.newPage();
    this.page = newPage;
    return newPage;
  }

  public async getElement(selector: string): Promise<ElementHandle<Element>> {
    return this.page.$(selector);
  }

  public async close(): Promise<void> {
    await this.page.close();
  }

  public async goToUrl(page: string): Promise<void> {
    await this.page.goto(page);
  }

  public async waitForLoadNetwork(timeout: number): Promise<void> {
    await this.page.waitForNetworkIdle({ timeout });
  }

  public async cookies(): Promise<ICookie[]> {
    const cookies = await this.page.cookies();

    return cookies.map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      path: cookie.path,
      domain: cookie.domain,
      expires: cookie.expires,
    }));
  }

  public async setCookie(cookies: ICookie[]): Promise<void> {
    await this.page.setCookie(...cookies);
  }

  public async waitNavigation(): Promise<void> {
    await this.page.waitForNavigation();
  }

  public getUrl(): string {
    const url = this.page.url();
    return url;
  }

  public getPages(): Promise<ICrawler["page"][]> {
    return this.browser.pages();
  }

  public async click(query: string, delay?: number): Promise<void> {
    await this.page.click(query, { delay });
  }

  public async focus(query: string): Promise<void> {
    await this.page.focus(query);
  }

  public async type(text: string, delay?: number): Promise<void> {
    await this.page.keyboard.type(text, { delay });
  }

  public async enter(): Promise<void> {
    await this.page.keyboard.press("Enter");
  }

  public async select(query: string, option: string): Promise<void> {
    await this.page.select(query, option);
  }

  public async waitForTimeout(delay: number): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  public async waitSelector(query: string): Promise<void> {
    await this.page.waitForSelector(query);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async inspect(
    callback: (...props: unknown[]) => unknown,
    ...props: unknown[]
  ): Promise<unknown> {
    return await this.page.evaluate(callback, ...props);
  }
}
