import { schema } from './index'

export type Account = typeof schema.accounts.$inferSelect
export type Profile = typeof schema.profiles.$inferSelect
export type Role = typeof schema.roles.$inferSelect
export type Permission = typeof schema.permissions.$inferSelect

export type Title = typeof schema.titles.$inferSelect
export type Track = typeof schema.tracks.$inferSelect
export type Genre = typeof schema.genres.$inferSelect
export type Watch = typeof schema.watch.$inferSelect

export type RoleAndPermission = Role & {
  permissions: Omit<Permission, 'roleId'>[]
}
export type AccountWithRoleAndPermission = Account & {
  role: RoleAndPermission
}
export type AccountProfile = Omit<Account, 'password'> & {
  profile: Omit<Profile, 'accountId'>
}
export type AccountRBAC = Omit<Account, 'password'> & {
  role: Role
}

export type TitleInfo = Title & {
  genres: Genre[]
  tracks: Omit<Track, 'titleId'>[]
}
export type TrackInfo = Track & {
  title: Omit<TitleInfo, 'tracks'>
}

export type WatchHistory = Omit<Watch, 'accountId' | 'trackId'> & {
  account: AccountProfile
  track: TrackInfo
}

export type AccountValues = Partial<Omit<Account, 'id'>>
export type ProfileValues = Partial<Omit<Profile, 'id'>>
export type RoleValues = Partial<Omit<Role, 'id'>>
export type PermissionValues = Partial<Omit<Permission, 'id'>>

export type TitleValues = Partial<Omit<Title, 'id'>>
export type TrackValues = Partial<Omit<Track, 'id'>>
export type WatchValues = Partial<Omit<Watch, 'id'>>
export type GenreValues = Partial<Omit<Genre, 'id'>>
