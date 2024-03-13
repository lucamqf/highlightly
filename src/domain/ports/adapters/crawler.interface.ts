import * as puppeteer from "puppeteer";

export interface IBrowserConfig {
  headless?: boolean;
  ignoreHTTPSErrors?: boolean;
  timeout?: number;
  defaultViewport?: {
    width: number;
    height: number;
  };
}

export interface IClickOptions {
  delay?: number;
}

export interface ICrawler {
  page: puppeteer.Page;
  browser: puppeteer.Browser;
}

export interface ICookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
}

export interface ICrawlerAdapterPage {
  open(): Promise<ICrawler["page"]>;
  close(): Promise<void>;
  goToUrl(page: string): Promise<void>;
  getUrl(): string;
  cookies(): Promise<ICookie[]>;
  getElement(selector: string): Promise<puppeteer.ElementHandle>;
  setCookie(cookies: ICookie[]): Promise<void>;
  getPages(): Promise<ICrawler["page"][]>;
  waitForLoadNetwork(timeout?: number): Promise<void>;
  waitForTimeout(delay: number): Promise<void>;
  waitSelector(query: string): Promise<void>;
  waitNavigation(): Promise<void>;
  click(query: string, delay?: number): Promise<void>;
  focus(query: string): Promise<void>;
  type(text: string, delay?: number): Promise<void>;
  enter(): Promise<void>;
  select(query: string, option: string): Promise<void>;
  inspect(
    callback: (...props: unknown[]) => unknown,
    ...props: unknown[]
  ): Promise<unknown>;
}

export interface ICrawlerAdapterPuppeteer {
  setBrowser(data?: IBrowserConfig): Promise<ICrawler["browser"]>;
  closeBrowser(browser: ICrawler["browser"]): Promise<void>;
  onPage(browser: ICrawler["browser"]): ICrawlerAdapterPage;
}
