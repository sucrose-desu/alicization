import type { PermissionValues } from '@/drizzle/types'

export const permissions: PermissionValues[] = [
  // CRUD - Configuration.
  { action: 'create', resource: 'configuration', isActive: false },
  { action: 'read', resource: 'configuration', isActive: true },
  { action: 'update', resource: 'configuration', isActive: true },
  { action: 'delete', resource: 'configuration', isActive: false },

  // CRUD - Team.
  { action: 'create', resource: 'team', isActive: true },
  { action: 'read', resource: 'team', isActive: true },
  { action: 'update', resource: 'team', isActive: true },
  { action: 'delete', resource: 'team', isActive: true },

  // CRUD - Account.
  { action: 'create', resource: 'account', isActive: true },
  { action: 'read', resource: 'account', isActive: true },
  { action: 'update', resource: 'account', isActive: true },
  { action: 'delete', resource: 'account', isActive: true },

  // CRUD - Role.
  { action: 'create', resource: 'role', isActive: true },
  { action: 'read', resource: 'role', isActive: true },
  { action: 'update', resource: 'role', isActive: true },
  { action: 'delete', resource: 'role', isActive: true },

  // CRUD - Permission.
  { action: 'create', resource: 'permission', isActive: true },
  { action: 'read', resource: 'permission', isActive: true },
  { action: 'update', resource: 'permission', isActive: true },
  { action: 'delete', resource: 'permission', isActive: true },

  // Additional
  { action: 'read', resource: 'report', isActive: true },
  { action: 'read', resource: 'logging', isActive: true }
]
