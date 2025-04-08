import { NextRequest } from 'next/server'

import { ApiResponse } from '@/libs/resp'
import { deleteGenre, findGenre, updateGenre } from '@/services/genres'
import { paramValidator, updateValidator } from '@/services/genres/validator.zod'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: NextParams) {
  try {
    const { id } = paramValidator.parse(await params)
    const [genre] = await findGenre(id)

    return ApiResponse.json(genre)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function PATCH(req: NextRequest, { params }: NextParams) {
  try {
    const { id } = paramValidator.parse(await params)
    const body = updateValidator.parse(await req.json())
    await updateGenre(id, body)

    return ApiResponse.message('The record has been successfully updated.')
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function DELETE(req: NextRequest, { params }: NextParams) {
  try {
    const { id } = await paramValidator.parseAsync(params)
    await deleteGenre(id)

    return ApiResponse.message('The record has been successfully deleted.')
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
