/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerError } from "../../exceptions/http/server.exception";
import { UnauthorizedError } from "../../exceptions/http/unauthorized.exception";
import { IHttpResponse } from "../http";

export class Response {
  public statusCode: number;

  public body?: any;

  private constructor(statusCode: number, body?: any) {
    this.statusCode = statusCode;
    this.body = body;

    Object.freeze(this);
  }

  static badRequest = (error: Error): IHttpResponse => new Response(400, error);

  static forbidden = (error: Error): IHttpResponse => new Response(403, error);

  static unauthorized = (): IHttpResponse =>
    new Response(401, new UnauthorizedError());

  static serverError = (error: Error): IHttpResponse => {
    console.log({ error });
    return new Response(500, new ServerError(error.stack));
  };

  static ok = (data?: any): IHttpResponse => new Response(200, data);

  static noContent = (): IHttpResponse => new Response(204, null);
}
