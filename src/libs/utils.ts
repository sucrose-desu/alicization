import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cls(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomIntNetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
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

export function createPagination<T = any>(
  data: T[],
  total: number,
  page: number,
  limit: number
): Pagination<T> {
  const lastPage = Math.ceil(total / limit)

  return {
    data,
    total,
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
