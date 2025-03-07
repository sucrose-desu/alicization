import { schema } from './index'

export type Account = typeof schema.accounts.$inferSelect
export type Profile = typeof schema.profiles.$inferSelect
export type Role = typeof schema.roles.$inferSelect
export type Permission = Omit<typeof schema.permissions.$inferSelect, 'roleId'>

export type RoleAndPermission = Role & {
  permissions: Permission[]
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

export type AccountValues = Partial<Omit<Account, SharedOmit>>
export type ProfileValues = Partial<Omit<Profile, SharedOmit | 'accountId'>>

export type RoleValues = Partial<Omit<Role, SharedOmit | 'teamId'>>
export type PermissionValues = Partial<Omit<Permission, SharedOmit | 'roleId'>>
