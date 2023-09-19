import { Request, Response } from "express";
import { IController } from "../../domain/ports/controllers";
import { IHttpRequest, IHttpResponse } from "../../domain/ports/http";

interface IMiddleware {
  (request: IHttpRequest): Promise<IHttpResponse>;
}

export const adaptResponse = (
  response: Response,
  httpResponse: IHttpResponse,
): Response => {
  try {
    if (!httpResponse || !httpResponse?.statusCode) {
      return response.status(500).json({
        error: "Error adapting response in http-adapter",
        type: "AdaptResponseError",
      });
    }

    if (httpResponse.statusCode === 200) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }

    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body?.message,
      type: httpResponse.body?.name,
    });
  } catch (error) {
    return response.status(500).json({
      error: "Error adapting response in http-adapter",
      type: "AdaptResponseError",
    });
  }
};

export const adaptRoute = (
  controller: IController,
  middlewares?: IMiddleware[],
) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
    };

    let errorOfMiddleware = false;
    let responseMiddleware: IHttpResponse;

    if (middlewares) {
      // eslint-disable-next-line no-restricted-syntax
      for (const middleware of middlewares) {
        responseMiddleware = await middleware(request);

        if (responseMiddleware) {
          errorOfMiddleware = true;
          break;
        }
      }
    }

    if (errorOfMiddleware) {
      return adaptResponse(response, responseMiddleware);
    }

    const httpResponse = await controller.handle(httpRequest);

    return adaptResponse(response, httpResponse);
  };
};
