import { createReadStream, statSync } from 'fs'
import { resolve } from 'path'

import mime from 'mime'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

import { ApiResponse } from '@/libs/resp'
import { hexToString } from '@/libs/utils'

const paramValidator = z.object({ path: z.string() })

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: NextParams) {
  try {
    const { path } = await paramValidator.parseAsync(params)
    const pathConverted = hexToString(path)
    const pathName = resolve('', pathConverted)

    const mimeType = mime.getType(pathName)
    const fileStat = statSync(pathName)

    if (mimeType && fileStat.isFile()) {
      const stream = createReadStream(pathName)
      const readableStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(chunk))
          stream.on('end', () => controller.close())
          stream.on('error', (error) => controller.error(error))
        }
      })

      const headers = new Headers()
      headers.append('Content-Type', mimeType)
      headers.append('Content-Length', fileStat.size.toString())

      return new NextResponse(readableStream, { headers })
    }

    return ApiResponse.catch(null)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
