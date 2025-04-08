import type { RoleAndPermission } from '@alicization-hub/db-schema'

import { defCanAccess, defTiers } from '@/constants'

/**
 * The function `permissionValidator` checks if a role has permission to access a specific resource and returns the corresponding access rights.
 *
 * @param {RoleAndPermission} role - The `role` parameter represents the role and permissions of a user.
 * It contains information such as the user's tier (e.g., admin, manager, user) and the permissions associated with that role.
 *
 * @param {Permission.Resources} resource - The `resource` parameter in the `permissionValidator` function represents the specific resource or entity that the user is trying to access or perform actions on.
 * It is used to determine the permissions that are granted to a user based on their role and the specific resource they are interacting with.
 *
 * @returns The function `permissionValidator` returns an object that represents the permissions a role has for a specific resource.
 * The object contains boolean properties `canRead`, `canCreate`, `canEdit`, and `canDelete` indicating whether the role has permission to perform the corresponding actions on the specified resource.
 */
export function permissionValidator(role: RoleAndPermission, resource: Permission.Resources) {
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
