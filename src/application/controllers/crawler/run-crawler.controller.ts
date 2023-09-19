import fs from "fs";
import { ICrawlerBuilder } from "src/domain/ports/builders/crawler.interface";
import { IController } from "src/domain/ports/controllers";
import { Response } from "src/domain/ports/controllers/output.interface";
import { IHttpResponse } from "src/domain/ports/http";

export class RunCrawlerController implements IController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly crawlerBuilder: ICrawlerBuilder) {}

  async handle(): Promise<IHttpResponse> {
    let page = await this.crawlerBuilder.mount();
    await page.goToUrl("https://read.amazon.com/notebook");

    await page.focus("input#ap_email");
    await page.type("luca.mqf@gmail.com", 100);
    await page.focus("input#ap_password");
    await page.type("KiSSMyAss100x!", 100);

    await page.click("input#signInSubmit");

    await page.waitNavigation();

    const cookies = await page.cookies();

    await this.crawlerBuilder.unmount();

    page = await this.crawlerBuilder.mount();
    await page.goToUrl("https://read.amazon.com/notebook");

    fs.writeFileSync("cookies.json", JSON.stringify(cookies));

    await page.setCookie(cookies);

    await page.goToUrl("https://read.amazon.com/notebook");

    return Response.ok(cookies);
  }
}
