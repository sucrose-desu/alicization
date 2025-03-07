declare type TResponse<D = any> = {
  statusCode: number
  message: string
  error?: any
  data?: D
}

declare type NextParams<T = Record<string, string>> = Readonly<{
  params: Promise<T>
}>
