/* eslint-disable no-empty-function */
import { IController } from "src/domain/ports/controllers";
import { Response } from "src/domain/ports/controllers/output.interface";
import { IExtractHighlightsCrawler } from "src/domain/ports/crawlers/extract-highlights-crawler.interface";
import { IHttpResponse } from "src/domain/ports/http";

export class ExtractHighlightsController implements IController {
  constructor(
    private readonly extractHighlightsCrawler: IExtractHighlightsCrawler,
  ) {}

  async handle(): Promise<IHttpResponse> {
    try {
      const result = await this.extractHighlightsCrawler.handle();

      if (result.isFailure) {
        return Response.badRequest(result.error);
      }

      return Response.ok(result.getValue());
    } catch (error) {
      return Response.serverError(error);
    }
  }
}
