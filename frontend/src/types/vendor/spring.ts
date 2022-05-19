export type SpringPage<T> = {
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
