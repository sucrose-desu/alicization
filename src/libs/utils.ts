import { clsx, type ClassValue } from 'clsx'
import qs from 'qs'
import { twMerge } from 'tailwind-merge'

export function cls(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUid(radix: number = 10) {
  return '1' + Math.random().toString(radix).slice(2, 8).padStart(8, '0')
}

export function randomIntNetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function strToHex(str: string) {
  const hex = Buffer.from(str, 'utf8').toString('hex')
  return Array.from(hex).reverse().join('')
}

export function hexToString(str: string) {
  const hex = Array.from(str).reverse().join('')
  return Buffer.from(hex, 'hex').toString('utf8')
}

/**
 * The function `searchParams` parses a search string into an object using specific options.
 * @param {string} search - The `searchParams` function takes a `search` string as input and uses the `qs.parse` method to parse the query string parameters from the search string. The options provided to `qs.parse` are:
 * @returns The function `searchParams` is returning an object that is parsed from the `search` string using the `qs.parse` method. The `qs.parse` method is parsing the search string with the specified options: `allowDots: true`, `comma: true`, and `ignoreQueryPrefix: true`.
 */
export function searchParams(search: string) {
  return qs.parse(search, {
    allowDots: true,
    comma: true,
    ignoreQueryPrefix: true
  })
}

export function isEqual(value: any, input?: any) {
  return !!input && input === value
}

export function isNotEqual(value: any, input?: any) {
  return !!input && input !== value
}

/**
 * Convert long number into abbreviated string.
 *
 * @param {number} input
 * @param {number} fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 */
export function abbreviateNumber(input: number, fractionDigits: number = 1) {
  const tier = (Math.log10(Math.abs(input)) / 3) | 0

  if (tier === 0) return input.toLocaleString()

  const suffix = ['', 'k', 'M', 'B', 'T', 'P', 'E'][tier]
  const scale = Math.pow(10, tier * 3)

  return (input / scale).toFixed(fractionDigits) + suffix
}

/**
 * The function creates a pagination object based on the provided data, count, page, and take parameters.
 *
 * @param {T[]} data - An array of items to be paginated.
 * @param {number} count - The `count` parameter represents the total number of items in the dataset.
 * @param {number} page - The `page` parameter in the `createPagination` function represents the current page number of the paginated data. It is used to determine the current page, as well as calculate the next and previous pages based on the total count of items and the specified `take` value.
 * @param {number} take - The `take` parameter in the `createPagination` function represents the number of items to display per page. It determines how many items from the `data` array should be included in each page of the pagination.
 * @returns The `createPagination` function returns an object of type `Pagination<T>`, which includes the following properties:
 * - `data`: an array of data items
 * - `count`: the total count of data items
 * - `currentPage`: the current page number
 * - `nextPage`: the next page number, or `null` if there is no next page
 * - `prevPage`: the previous page number, or `null` if there is no previous page
 * - `lastPage`: the last page number
 */
export function createPagination<T = any>(
  data: T[],
  count: number,
  page: number,
  take: number
): Pagination<T> {
  const lastPage = Math.ceil(count / take) || 1

  return {
    data,
    count,
    currentPage: page,
    nextPage: page + 1 > lastPage ? null : page + 1,
    prevPage: page - 1 < 1 ? null : page - 1,
    lastPage
  }
}

/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values,
 * which can then be easily sent using the XMLHttpRequest.send() method.
 *
 * @param {object} data FormData
 */
export function createFormData(data: Record<string, any>): [FormData, any] {
  const formData = new FormData()

  for (const name in data) {
    formData.append(name, data[name])
  }

  return [
    formData,
    {
      'Content-Type': 'multipart/form-data'
    }
  ]
}
