import { schema } from './index'

export type Account = typeof schema.accounts.$inferSelect
export type Profile = typeof schema.profiles.$inferSelect
export type Role = typeof schema.roles.$inferSelect
export type Permission = typeof schema.permissions.$inferSelect

export type RoleAndPermission = Role & {
  permissions: Omit<Permission, 'roleId'>[]
}
export type AccountWithRole = Account & {
  role: Role
}
export type AccountWithRoleAndPermission = Account & {
  role: RoleAndPermission
}
export type AccountProfile = Omit<Account, 'password'> & {
  profile: Omit<Profile, 'accountId' | 'promotionId'>
}
export type AccountRBAC = AccountProfile & {
  role: RoleAndPermission
}

export type AccountValues = Partial<Omit<Account, SharedOmit>>
export type ProfileValues = Partial<Omit<Profile, SharedOmit | 'accountId'>>

export type RoleValues = Partial<Omit<Role, SharedOmit>>
export type PermissionValues = Partial<Omit<Permission, SharedOmit | 'roleId'>>
