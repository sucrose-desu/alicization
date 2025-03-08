import { setTimeout } from 'timers/promises'

import { consoleLog } from '../utils'
import { createAccounts } from './accounts'
import { createGenres } from './genres'

async function seeding() {
  consoleLog('Database seeding initialized.')

  // Seeding `Accounts` with role and permissions.
  await createAccounts()
  await setTimeout(1e3)

  // Seeding `Genres`
  await createGenres()

  consoleLog('Database seeding has been successfully, 🎉')
  process.exit(0)
}

seeding()
