import { setTimeout } from 'timers/promises'

import { faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'

import { permissions } from '@/constants/permissions'

import { db, schema } from '../index'
import type { AccountValues, PermissionValues, ProfileValues, RoleValues } from '../types'
import { consoleLog } from '../utils'

const phoneNo = () => `09${faker.number.int({ min: 0, max: 99999999 })}`.padStart(8, '0')
const dataset = [
  {
    uid: '000000000',
    username: 'root@alice.live',
    password: hashSync('password'),
    isActive: true,
    isVerified: true,
    profile: {
      email: 'root@alice.live',
      phoneNo: '0900000000',
      displayName: 'display name',
      avatar: 'default-avatar.webp',
      bio: faker.lorem.paragraph()
    },
    role: {
      tier: 'root',
      name: 'Root',
      description: faker.lorem.sentence(),
      permissions
    }
  },
  {
    uid: '100000000',
    username: 'admin@alice.live',
    password: hashSync('password'),
    isActive: true,
    isVerified: true,
    profile: {
      email: 'admin@alice.live',
      phoneNo: phoneNo(),
      displayNeme: 'display name',
      avatar: 'default-avatar.webp',
      bio: faker.lorem.paragraph()
    },
    role: {
      tier: 'admin',
      name: 'Administrator',
      description: faker.lorem.sentence(),
      permissions
    }
  },
  {
    uid: '100000001',
    username: 'assistant@alice.live',
    password: hashSync('password'),
    isActive: true,
    isVerified: true,
    profile: {
      email: 'assistant@alice.live',
      phoneNo: phoneNo(),
      displayNeme: 'display name',
      avatar: 'default-avatar.webp',
      bio: faker.lorem.paragraph()
    },
    role: {
      tier: 'assistant',
      name: 'Assistant',
      description: faker.lorem.sentence(),
      permissions
    }
  },
  {
    uid: '100000002',
    username: 'operater@alice.live',
    password: hashSync('password'),
    isActive: true,
    isVerified: true,
    profile: {
      email: 'operater@alice.live',
      phoneNo: phoneNo(),
      displayNeme: 'display name',
      avatar: 'default-avatar.webp',
      bio: faker.lorem.paragraph()
    },
    role: {
      tier: 'operater',
      name: 'Operater',
      description: faker.lorem.sentence(),
      permissions
    }
  },
  {
    uid: '100000003',
    username: 'user@alice.live',
    password: hashSync('password'),
    isActive: true,
    isVerified: true,
    profile: {
      email: 'user@alice.live',
      phoneNo: phoneNo(),
      displayNeme: 'display name',
      avatar: 'default-avatar.webp',
      bio: faker.lorem.paragraph()
    },
    role: {
      tier: 'user',
      name: 'Member',
      description: faker.lorem.sentence()
    }
  },
  {
    uid: '100000004',
    username: 'guest@alice.live',
    password: hashSync('password'),
    isActive: true,
    isVerified: true,
    profile: {
      email: 'guest@alice.live',
      phoneNo: phoneNo(),
      displayNeme: 'display name',
      avatar: 'default-avatar.webp',
      bio: faker.lorem.paragraph()
    },
    role: {
      tier: 'guest',
      name: 'Guest',
      description: faker.lorem.sentence()
    }
  }
] as Array<
  AccountValues & {
    profile: ProfileValues
    role: RoleValues & {
      permissions?: PermissionValues[]
    }
  }
>

export async function createAccounts() {
  consoleLog('Accounts data seeding...')

  for await (const account of dataset) {
    const {
      role: { permissions, ...role },
      profile,
      ...accountValues
    } = account as any

    const [accountId, roleId] = await db.transaction(async (tx) => {
      const [{ accountId }] = await tx
        .insert(schema.accounts)
        .values(accountValues)
        .returning({ accountId: schema.accounts.id })

      const [{ roleId }] = await tx.insert(schema.roles).values(role).returning({ roleId: schema.roles.id })

      return [accountId, roleId]
    })

    await db.transaction(async (tx) => {
      await tx.insert(schema.accountWithRole).values({ accountId, roleId })
      await tx.insert(schema.profiles).values({ accountId, ...profile })

      if (permissions?.length) {
        await tx
          .insert(schema.permissions)
          .values(permissions.map((permission: any) => ({ roleId, ...permission })))
      }
    })

    consoleLog(`Account data seeded: \x1b[36m${accountId}: "${account.username}"\x1b[0m`)
    await setTimeout(100)
  }

  consoleLog('Accounts data seeding success, ✅')
}
