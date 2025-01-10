export interface BaseResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, string[]>;
}

export type ApiResponse<T> = BaseResponse<T> | ErrorResponse;