import path from 'path'

import fluent, { type FfprobeFormat } from 'fluent-ffmpeg'

import { randomIntNetween } from '../utils'

export async function getFileFormat(pathName: string): Promise<FfprobeFormat> {
  return new Promise((resolve, reject) => {
    fluent.ffprobe(pathName, (err, data) => {
      if (err) reject(err)
      else resolve(data.format)
    })
  })
}

export async function takeScreenshots(pathName: string, ts?: number): Promise<string> {
  const rootFolder = path.resolve('D:\\Thumbnails', '1')
  ts ||= randomIntNetween(2, 98)

  return new Promise((resolve, reject) => {
    fluent(pathName)
      .screenshots({
        count: 1,
        size: '?x480',
        timestamps: [`${ts}%`],
        folder: rootFolder
      })
      .on('end', () => {
        resolve(path.join(rootFolder, 'tn.png'))
      })
      .on('error', (error) => {
        console.error('Error processing video:', error)
        reject(error)
      })
  })
}
