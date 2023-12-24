export type Pagination = {
  hasNextPage: boolean
  lastCursor?: number
  perPage?: number
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: Pagination
}
