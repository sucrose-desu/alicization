import { NextRequest } from 'next/server'

import { ApiResponse } from '@/libs/resp'
import { createPagination, searchParams } from '@/libs/utils'
import { createGenre, findGenres } from '@/services/genres'
import { createValidator, queryValidator } from '@/services/genres/validator.zod'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const qs = queryValidator.parse(searchParams(req.nextUrl.search))

    const [count, genres] = await findGenres(qs)
    const results = createPagination(genres, count, qs.page, qs.take)

    return ApiResponse.json(results)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = createValidator.parse(await req.json())
    const [created] = await createGenre(body)

    return ApiResponse.json(
      {
        statusCode: 201,
        message: 'The record has been successfully created.',
        data: created
      },
      201
    )
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
