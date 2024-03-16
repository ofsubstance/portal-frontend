export interface IResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  body: T;
}
