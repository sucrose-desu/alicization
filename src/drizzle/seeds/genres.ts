import { setTimeout } from 'timers/promises'

import { db, schema } from '..'
import type { GenreValues } from '../types'
import { consoleLog } from '../utils'

const dataset = [
  {
    text: 'Action (ต่อสู้)'
  },
  {
    text: 'Adventure (ผจญภัย)'
  },
  {
    text: 'Comedy (ตลก)'
  },
  {
    text: 'Demons (ปีศาจ)'
  },
  {
    text: 'Detective (นักสืบ)'
  },
  {
    text: 'Drama (ดราม่า)'
  },
  {
    text: 'Ecchi (ทะลึ่ง)'
  },
  {
    text: 'Fantasy (แฟนตาซี)'
  },
  {
    text: 'Game (เกม)'
  },
  {
    text: 'Gourmet (อาหาร)'
  },
  {
    text: 'Harem (ฮาเร็ม)'
  },
  {
    text: 'Hentai (เฮ็นไต)'
  },
  {
    text: 'Historical (ประวัติศาสตร์)'
  },
  {
    text: 'Horror (สยองขวัญ)'
  },
  {
    text: 'Idols (ไอดอล)'
  },
  {
    text: 'Isekai (ต่างโลก)'
  },
  {
    text: 'Iyashikei (ดีต่อใจ)'
  },
  {
    text: 'Josei (เด็กผู้หญิง)'
  },
  {
    text: 'Love Polygon (รักสามเศร้า)'
  },
  {
    text: 'Magic (เวทย์มนต์)'
  },
  {
    text: 'Martial Arts (ศิลปะการต่อสู้)'
  },
  {
    text: 'Mecha (หุ่นยนต์)'
  },
  {
    text: 'Military (ทหาร)'
  },
  {
    text: 'Music (เพลง)'
  },
  {
    text: 'Mystery (ลึกลับ)'
  },
  {
    text: 'Parody (ล้อเลียน)'
  },
  {
    text: 'Performing Arts (ศิลปะการแสดง)'
  },
  {
    text: 'Police (ตำรวจ)'
  },
  {
    text: 'Psychological (จิตวิทยา)'
  },
  {
    text: 'Racing (แข่งรถ)'
  },
  {
    text: 'Reincarnation (การกลับชาติมาเกิดใหม่)'
  },
  {
    text: 'Romance (โรแมนติก)'
  },
  {
    text: 'Samurai (ซามูไร)'
  },
  {
    text: 'School (โรงเรียน)'
  },
  {
    text: 'Sci-Fi (ไซ-ไฟ)'
  },
  {
    text: 'Seinen (วัยรุ่น)'
  },
  {
    text: 'Shoujo (สาวน้อย)'
  },
  {
    text: 'Shoujo Ai (ยูริ)'
  },
  {
    text: 'Shounen (หนุ่มน้อย)'
  },
  {
    text: 'Shounen Ai (ยาโอย)'
  },
  {
    text: 'Slice of Life (ชีวิตประจำวัน)'
  },
  {
    text: 'Space (อวกาศ)'
  },
  {
    text: 'Sports (กีฬา)'
  },
  {
    text: 'Super Power (พลังพิเศษ)'
  },
  {
    text: 'Supernatural (เหนือธรรมชาติ)'
  },
  {
    text: 'Suspense (ตื่นเต้น)'
  },
  {
    text: 'Time Travel (การเดินทางข้ามเวลา)'
  },
  {
    text: 'Tokusatsu (โทคุซัทสึ)'
  },
  {
    text: 'Vampire (แวมไพร์)'
  },
  {
    text: 'Workplace (ที่ทำงาน)'
  }
] as GenreValues[]

export async function createGenres() {
  consoleLog('Genres data seeding...')

  await db.insert(schema.genres).values(dataset as any[])
  await setTimeout(1e3)

  consoleLog('Genres data seeding success, ✅')
}
