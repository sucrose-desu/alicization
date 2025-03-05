declare type XHResponse<D = any> = {
  statusCode: number
  message: string
  error?: string
  data?: D
}

declare type XHRLogin = {
  accessToken: string
  refreshToken: string
  expiresAt: string
}

declare type NextParams<T = any> = {
  params: T
}
