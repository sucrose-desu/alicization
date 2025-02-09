import { clsx, type ClassValue } from 'clsx'
import qs, { type IParseOptions } from 'qs'
import { twMerge } from 'tailwind-merge'

export class queryString {
  static toJSON(searchParams: string, options?: IParseOptions) {
    return qs.parse(searchParams, {
      ...options,
      allowDots: true,
      comma: true,
      ignoreQueryPrefix: true
    })
  }
}

export function cls(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(radix: number = 16) {
  return Math.random().toString(radix).slice(2)
}

export function randomIntNetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function dateToSeconds(date: Date) {
  return (+date - new Date().getTime()) / 1e3
}

export function stripHtml(str: string) {
  return str.replaceAll(/<[^>]*>?/gm, '')
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
 * `{ take: limit, skip: (page - 1) * limit }`
 * @param payload Object
 * @param total Number
 * @param page Number
 * @param limit Number
 */
export function createPaginate<P = any>(payload: P[], total: number, page: number, limit: number) {
  const lastPage = Math.ceil(total / limit)
  const nextPage = page + 1 > lastPage ? null : page + 1
  const prevPage = page - 1 < 1 ? null : page - 1

  return {
    data: payload,
    total,
    currentPage: page,
    nextPage,
    prevPage,
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
