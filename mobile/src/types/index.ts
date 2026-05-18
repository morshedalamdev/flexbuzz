export const StatusType = {
  DEFAULT: "default",
  SUCCESS: "success",
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
} as const;
export type StatusType = (typeof StatusType)[keyof typeof StatusType];

export const Gender = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

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
