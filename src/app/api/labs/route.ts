import { type NextRequest } from 'next/server'
import qs from 'qs'
import { z } from 'zod'

import { ApiResponse } from '@/libs/resp'
import { strToHex } from '@/libs/utils'

const paramValidator = z.object({ path: z.string() })

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = qs.parse(request.nextUrl.search, {
    allowDots: true,
    comma: true,
    ignoreQueryPrefix: true
  })

  try {
    const qs = await paramValidator.parseAsync(searchParams)
    const hex = strToHex(qs.path)

    return ApiResponse.json({
      originPath: qs.path,
      hexPath: hex,
      timestamp: Date.now()
    })
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
