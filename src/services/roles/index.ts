import { and, eq, getTableColumns } from 'drizzle-orm'
import { omit } from 'ramda'

import { db, schema } from '@/drizzle'
import type { RoleAndPermission } from '@/drizzle/types'

export async function findRoleAndPermissions(teamId: number, accountId: number) {
  const roleColumns = getTableColumns(schema.roles)
  const permissionColumns = getTableColumns(schema.permissions)

  const result = await db
    .select({
      role: omit(['teamId'], roleColumns),
      permissions: omit(['roleId'], permissionColumns)
    })
    .from(schema.stateOfTeams)
    .innerJoin(schema.roles, eq(schema.stateOfTeams.roleId, schema.roles.id))
    .innerJoin(schema.permissions, eq(schema.permissions.roleId, schema.roles.id))
    .where(
      and(eq(schema.stateOfTeams.teamId, teamId), eq(schema.stateOfTeams.accountId, accountId))
    )

  const groupedRoles = result.reduce<Record<number, RoleAndPermission>>(
    (accumulator, { role, permissions }) => {
      if (!accumulator[role.id]) {
        accumulator[role.id] = { ...role, permissions: [] }
      }

      accumulator[role.id].permissions.push(permissions)
      return accumulator
    },
    {}
  )

  return Object.values(groupedRoles)
}
