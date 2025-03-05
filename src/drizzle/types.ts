import { schema } from './index'

export type Account = typeof schema.accounts.$inferSelect
export type Profile = typeof schema.profiles.$inferSelect
export type Role = Omit<typeof schema.roles.$inferSelect, 'teamId'>
export type Permission = Omit<typeof schema.permissions.$inferSelect, 'roleId'>
export type Team = typeof schema.teams.$inferSelect

export type RoleAndPermission = Role & {
  permissions: Permission[]
}
export type AccountWithRole = Account & {
  role: Role
}
export type AccountWithRoleAndPermission = Account & {
  role: RoleAndPermission
}
export type AccountProfile = Omit<Account, 'password'> & {
  profile: Omit<Profile, 'accountId'>
}
export type AccountOBAC = Omit<Account, 'password'> & {
  role: Role
  team: Team
}

export type AccountValues = Partial<Omit<Account, SharedOmit>>
export type ProfileValues = Partial<Omit<Profile, SharedOmit | 'accountId'>>

export type RoleValues = Partial<Omit<Role, SharedOmit | 'teamId'>>
export type PermissionValues = Partial<Omit<Permission, SharedOmit | 'roleId'>>

export type TeamValues = Partial<Omit<Team, SharedOmit>>
