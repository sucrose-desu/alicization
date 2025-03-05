import { and, eq } from 'drizzle-orm'

import { db, schema } from '@/drizzle'
import type { AccountOBAC } from '@/drizzle/types'

export async function findAccountProfileBy(
  teamId: number,
  accountId: number
): Promise<AccountOBAC | void> {
  const result = await db.query.stateOfTeam.findFirst({
    where: and(eq(schema.teams.id, teamId), eq(schema.accounts.id, accountId)),
    with: {
      account: {
        columns: { password: false }
      },
      role: {
        columns: { teamId: false }
      },
      team: true
    }
  })

  if (result) {
    return {
      ...result?.account,
      role: result?.role,
      team: result?.team
    }
  }
}
