import { NextRequest } from 'next/server'
import { z } from 'zod'

import { ApiResponse } from '@/libs/resp'
import { searchParams, strToHex } from '@/libs/utils'

const queryValidator = z.object({ path: z.string() })

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const qs = queryValidator.parse(searchParams(req.nextUrl.search))

    return ApiResponse.json({
      path: qs.path,
      hex: strToHex(qs.path)
    })
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
