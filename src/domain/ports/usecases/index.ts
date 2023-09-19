import { Result } from "./output.interface";

export interface IUseCase<PayloadType, ResultType> {
  execute: (payload: PayloadType) => Promise<Result<ResultType>>;
}
