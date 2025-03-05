import { db, schema } from '../index'
import { consoleLog } from '../utils'

async function main() {
  consoleLog('Database seeding initialized.')

  // Seeding `Accounts` with role and permissions.
  consoleLog('Accounts data seeding...')
  // await db.insert(schema.accounts).values({})
  consoleLog('Accounts data seeding success, ✅')

  consoleLog('Database seeding has been successfully, 🎉')
}

main()
