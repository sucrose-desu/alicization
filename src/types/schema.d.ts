declare namespace Role {
  export type Tiers = 'root' | 'admin' | 'assistant' | 'operater' | 'user' | 'guest'
}

declare namespace Permission {
  export type Actions = 'create' | 'read' | 'update' | 'delete'
  export type Resources = 'configuration' | 'team' | 'account' | 'role' | 'permission' | 'report' | 'logging'
}

declare namespace Genre {
  export type Group = 'public' | 'classified'
}

declare namespace Title {
  export type Category = 'anime' | 'cinema' | 'movies' | 'series' | 'etc'
  export type Dubbed = 'chinese' | 'english' | 'japan' | 'korea' | 'thai'
  export type Source = 'game' | 'manga' | 'light-novel' | 'original' | 'web-manga' | 'etc'
  export type Status = 'airing' | 'awaiting' | 'finished'
}
