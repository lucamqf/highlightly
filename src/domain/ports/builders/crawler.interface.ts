import { ICrawlerAdapterPage } from "../adapters/crawler.interface";

export interface ICrawlerBuilder {
  mount(): Promise<ICrawlerAdapterPage>;
  unmount(): Promise<void>;
  goToUrl(endpoint: string): Promise<void>;
  waitForLoadNetwork(): Promise<void>;
}
