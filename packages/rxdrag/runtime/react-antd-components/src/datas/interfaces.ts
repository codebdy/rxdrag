export interface IPaginationConfig {
  total?: number,
  pageSize?: number,
  currentPage?: number,
  onPageChange?: (currentPage: number, pageSize?: number) => void
}