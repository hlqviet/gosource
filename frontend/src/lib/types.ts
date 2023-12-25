export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    hasNextPage: boolean
    lastCursor?: number
  }
}
