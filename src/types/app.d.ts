declare type SharedOmit = 'id' | 'createdAt' | 'updatedAt'

declare type CanAccess = Record<'canRead' | 'canCreate' | 'canEdit' | 'canDelete', boolean>

declare type JwtPayload = {
  id: number
  uid: string
  role: number
  team: number
}

declare type Pagination<T = any> = {
  data: T[]
  total: number
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  lastPage: number
}

declare type IterableState = 'all' | Iterable<string | number>

declare type CountdownDuration = Record<
  'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds',
  number
>

declare type UseDisclosureReturn = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onOpenChange: () => void
  isControlled: boolean
  getButtonProps: (props?: any) => any
  getDisclosureProps: (props?: any) => any
}
