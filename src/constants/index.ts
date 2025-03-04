import { ENV } from './env'

export const isBrowser = typeof window !== 'undefined'
export const isProduction = ENV.APP_MODE === 'production'
export const isDevelop = ENV.APP_MODE === 'development'
export const isLocal = ENV.APP_MODE === 'local'

// STORAGE KEY-NAME
export const APP_AUTH_ACCESS = `__APP.AccessToken${!isProduction && `-${ENV.APP_NAME}`}`
export const APP_AUTH_REFRESH = `__APP.RefreshKey${!isProduction && `-${ENV.APP_NAME}`}`
export const APP_LANG = `__APP.Language${!isProduction && `-${ENV.APP_NAME}`}`
export const APP_THEME = `__APP.Theme${!isProduction && `-${ENV.APP_NAME}`}`

// REQUEST HEADERS
export const ACCEPT_LANG = 'Accept-Language'
export const ACCEPT_RANGES = 'Accept-Ranges'
export const CONTENT_LANG = 'Content-Language'
export const CONTENT_LENGTH = 'Content-Length'
export const CONTENT_RANGE = 'Content-Range'
export const CONTENT_TYPE = 'Content-Type'
