import type { PermissionValues } from '@alicization-hub/db-schema'

export const permissions: PermissionValues[] = [
  // CRUD - Configuration.
  { action: 'create', resource: 'configuration', isActive: false },
  { action: 'read', resource: 'configuration', isActive: true },
  { action: 'update', resource: 'configuration', isActive: true },
  { action: 'delete', resource: 'configuration', isActive: false },

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

  // CRUD - Genra.
  { action: 'create', resource: 'genre', isActive: true },
  { action: 'read', resource: 'genre', isActive: true },
  { action: 'update', resource: 'genre', isActive: true },
  { action: 'delete', resource: 'genre', isActive: true },

  // CRUD - Title.
  { action: 'create', resource: 'title', isActive: true },
  { action: 'read', resource: 'title', isActive: true },
  { action: 'update', resource: 'title', isActive: true },
  { action: 'delete', resource: 'title', isActive: true },

  // CRUD - Track.
  { action: 'create', resource: 'track', isActive: true },
  { action: 'read', resource: 'track', isActive: true },
  { action: 'update', resource: 'track', isActive: true },
  { action: 'delete', resource: 'track', isActive: true },

  // Additional
  { action: 'read', resource: 'report', isActive: true },
  { action: 'read', resource: 'logging', isActive: true }
]
