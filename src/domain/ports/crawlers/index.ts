import { Result } from "../usecases/output.interface";

export interface ICrawler<P, R> {
  handle: (payload: P) => Promise<Result<R>>;
}
