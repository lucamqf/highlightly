/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-empty-function */
import { ICrawlerBuilder } from "src/domain/ports/builders/crawler.interface";
import {
  IBook,
  IExtractHighlightsCrawler,
  IExtractHighlightsCrawlerOutput,
  IHighlight,
} from "src/domain/ports/crawlers/extract-highlights-crawler.interface";
import { Result } from "src/domain/ports/usecases/output.interface";

export class ExtractHighlightsCrawler implements IExtractHighlightsCrawler {
  constructor(private readonly crawlerBuilder: ICrawlerBuilder) {}

  async handle(): Promise<Result<IExtractHighlightsCrawlerOutput>> {
    const page = await this.crawlerBuilder.mount();
    await page.goToUrl("https://read.amazon.com/notebook");

    const captcha = await page.getElement(".a-box img");

    if (captcha) {
      return Result.fail(new Error("Crawler blocked by captcha"));
    }

    await page.focus("input#ap_email");
    await page.type("luca.mqf@gmail.com", 100);
    await page.focus("input#ap_password");
    await page.type("KiSSMyAss100x!", 100);

    await page.click("input#signInSubmit");

    await page.waitNavigation();

    await page.waitSelector(".kp-notebook-title");

    const books = (await page.inspect(() => {
      const booksElements = Array.from(
        document.querySelectorAll(
          "#kp-notebook-library .kp-notebook-library-each-book",
        ),
      );

      return booksElements.map((book) => {
        const id = book.id;
        const title = book.querySelector(
          "h2.kp-notebook-searchable",
        ).textContent;
        const authors = book.querySelector(
          "p.kp-notebook-searchable",
        ).textContent;
        const image = book.querySelector("img").src;

        return { id, title, authors, image };
      });
    })) as IBook[];

    const highlights = (await page.inspect(async (books: IBook[]) => {
      const waitForElement = async (selector: string, lastRetry = 0) => {
        if (lastRetry > 5) {
          return null;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const element = document.querySelector(selector);

        if (!element) {
          return waitForElement(selector, lastRetry + 1);
        }

        return element;
      };

      const allHighlights = {};

      for (const book of books) {
        const bookElement = document.getElementById(book.id);

        bookElement.querySelector("a").click();

        const highlightsContainer = await waitForElement(
          "#annotations #a-page",
        );

        if (!highlightsContainer) {
          allHighlights[book.id] = [];

          continue;
        }

        const highlightsElements = Array.from(
          document.querySelectorAll("#kp-notebook-annotations > div"),
        ).filter((element) => !(element.id === "empty-annotations-pane"));

        if (!highlightsElements || highlightsElements.length === 0) {
          allHighlights[book.id] = [];
          continue;
        }

        const bookHighlights = highlightsElements.map((highlight) => {
          const title =
            highlight.querySelector("span#highlight")?.textContent ?? null;
          const note =
            highlight.querySelector(".kp-notebook-highlight-note")
              ?.textContent ?? null;

          const header =
            highlight.querySelector("#annotationHighlightHeader")
              ?.textContent ?? "";

          const [location] = header.match(/\d+/g);
          const [type] = header.match(/\w+ highlight/gi);

          const cleanedType = type
            ? type.replace("highlight", "").toLowerCase()
            : null;

          return { title, note, location: location ?? null, type: cleanedType };
        });

        allHighlights[book.id] = bookHighlights;
      }

      return allHighlights;
    }, books)) as Record<string, IHighlight[]>;

    await this.crawlerBuilder.unmount();

    return Result.ok({ books, highlights });
  }
}
