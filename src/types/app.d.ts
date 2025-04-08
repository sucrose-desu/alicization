/// <reference types="@alicization-hub/db-schema/global-types" />

declare type CanAccess = Record<'canRead' | 'canCreate' | 'canEdit' | 'canDelete', boolean>

declare type JwtPayload = {
  id: number
  uid: string
  role: Tiers
}

declare type Pagination<T = any> = {
  data: T[]
  count: number
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  lastPage: number
}

declare type CountdownDuration = Record<
  'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds',
  number
>

declare type IterableState = 'all' | Iterable<string | number>

declare type UseDisclosureReturn = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onOpenChange: () => void
  isControlled: boolean
  getButtonProps: (props?: any) => any
  getDisclosureProps: (props?: any) => any
}
