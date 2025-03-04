declare type Tiers = 'root' | 'admin' | 'assistant' | 'operater' | 'user' | 'guest'

declare type PermissionActions = 'create' | 'read' | 'update' | 'delete'
declare type PermissionResources =
  | 'configuration'
  | 'account'
  | 'role'
  | 'permission'
  | 'report'
  | 'logging'
