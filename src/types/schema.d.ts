declare type Tiers = 'root' | 'admin' | 'assistant' | 'operater' | 'user' | 'guest'

declare type PermissionActions = 'create' | 'read' | 'update' | 'delete'
declare type PermissionResources =
  | 'configuration'
  | 'team'
  | 'account'
  | 'role'
  | 'permission'
  | 'report'
  | 'logging'

declare type GenreGroup = 'general' | 'classified'

declare type TitleCategory = 'anime' | 'cinema' | 'movies' | 'series' | 'etc'
declare type TitleDubbed = 'chinese' | 'english' | 'japan' | 'korea' | 'thai'
declare type TitleSource = 'game' | 'manga' | 'light-novel' | 'original' | 'web-manga' | 'etc'
declare type TitleStatus = 'airing' | 'awaiting' | 'finished'
