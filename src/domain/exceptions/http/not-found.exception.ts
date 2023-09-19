export class NotFoundError extends Error {
  constructor() {
    super(`The data not found.`);
    this.name = "NotFoundError";
  }
}
