/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpResponse {
  statusCode: number;
  body?: any;
}

export interface IHttpRequest {
  params?: any;
  query?: any;
  body?: any;
  headers?: any;
}

export interface IHttpNextFunction {
  (error?: Error): void;
}
