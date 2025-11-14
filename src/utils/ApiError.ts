export default class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);      // set the error message
    this.status = status; // HTTP status code
  }
}
