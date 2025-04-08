import { format } from 'date-fns'

export function consoleLog(str: string) {
  console.log(
    `\x1b[36m[${format(new Date(), 'PPpp')}]\x1b[0m -`,
    `\x1b[32m[DrizzleORM]\x1b[0m`,
    `\x1b[37m${str}\x1b[0m`
  )
}
