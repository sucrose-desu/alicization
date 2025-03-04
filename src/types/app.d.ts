declare type SharedOmit = 'id' | 'createdAt' | 'updatedAt'

declare type Pagination<T = any> = {
  data: T[]
  total: number
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  lastPage: number
}
