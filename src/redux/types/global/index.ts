export type TRequestStatus = {
  isLoading: boolean | null;
  isError: boolean | null;
  isErrorMessage?: string;
};
export type TItemsWithTotalLength<T> = {
  isLoading: boolean | null;
  isError: boolean;
  totalItems: number;
  items: T[];
};
export interface IRequestBody<T> {
  id: string;
  userId?: string;
  body: T;
}
export type TResponseBody = {
  message: string;
  statusCode: string;
};
export type TFetchParams = {
  skip?: number;
  limit?: number;
  userId?: string;
};