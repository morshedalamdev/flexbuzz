export interface PaginationInterface<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    firstPage: string;
    prevPage: string;
    nextPage: string;
    lastPage: string;
  };
}