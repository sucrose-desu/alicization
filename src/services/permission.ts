import { defCanAccess, defTiers } from '@/constants'
import { RoleAndPermission } from '@/drizzle/types'

export function permissionValidator(role: RoleAndPermission, resource: string) {
  if (!defTiers.has(role.tier)) return defCanAccess

  return role.permissions
    .filter((permission) => permission.resource === resource && permission.isActive)
    .reduce((accumulator, permission) => {
      if (permission.action === 'read') accumulator.canRead = true
      else if (permission.action === 'create') accumulator.canCreate = true
      else if (permission.action === 'update') accumulator.canEdit = true
      else if (permission.action === 'delete') accumulator.canDelete = true
      return accumulator
    }, defCanAccess)
}
