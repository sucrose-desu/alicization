import { CardComponent } from './components/card'
import { ContextComponent } from './components/context'
import { CountdownComponent } from './components/countdown'
import { GenreComponent } from './components/genre'

import '@/styles/pages/labs.css'

export default function LabsContainer() {
  // __STATE's

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--labs-container'>
      <div className='mb-8 grid gap-1'>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
      </div>

      <CountdownComponent />

      <div className='mb-8 grid grid-flow-col justify-start gap-4'>
        <CardComponent
          poster='/static/images/posters/138006l.jpg'
          title='Sousou no Frieren'
          desc='คำอธิฐานในวันที่จากลา Frieren'
          key={10}
        />

        <CardComponent
          poster='/static/images/posters/137254l.jpg'
          title='Sousou no Frieren'
          desc='คำอธิฐานในวันที่จากลา Frieren'
          key={11}
        />

        <CardComponent
          poster='/static/images/posters/136959l.jpg'
          title='Sousou no Frieren'
          desc='คำอธิฐานในวันที่จากลา Frieren'
          key={12}
        />

        <CardComponent
          poster='/static/images/posters/127908l.jpg'
          title='Sousou no Frieren'
          desc='คำอธิฐานในวันที่จากลา Frieren'
          key={13}
        />
      </div>

      <div className='mb-8 grid gap-1'>
        <img
          className='h-[400px] w-[280px] rounded object-cover object-center'
          alt='Sousou no Frieren'
          src={`/static/images/posters/${['127908l', '136959l', '137254l', '138006l'][0]}.jpg`}
        />

        <h2>Sousou no Frieren</h2>
        <p className='text-lg font-medium'>คำอธิฐานในวันที่จากลา Frieren</p>
        <p className='line-clamp-6 max-w-lg font-light text-gray-200'>
          ฟรีเรน
          นักเวทสาวได้ร่วมมือกับพวกผู้กล้าฮิลเมลจัดการจอมมารในช่วงสุดท้ายของการผจญภัยกว่าสิบปีและนำพาสันติสุขคืนสู่โลก
          เธอผู้เป็นเอลฟ์ที่มีอายุยืนยาวกว่าพันปีได้สัญญาว่าจะกลับมาพบกับพวกฮิลเมลอีกครั้งและออกเดินทางคนเดียว
          หลังจากนั้น 50 ปี ฟรีเรนได้มาเยี่ยมเยือนฮิลเมล
          แต่ฮิลเมลกลับแก่ชราลงไปและอยู่ในช่วงบั้นปลายของชีวิตทั้งที่เธอยังเหมือนเมื่อ 50
          ปีก่อนไม่เปลี่ยนแปลง จากนั้น เธอก็ได้เห็นฮิลเมลที่ความตายมาเยือนต่อหน้าต่อตา
          และได้ตระหนักว่าที่ผ่านมาตัวเองไม่ได้ "รู้จักมนุษย์" เอาเสียเลย
          ฟรีเรนผู้สำนึกเสียใจจึงได้ออกเดินทาง "เพื่อให้รู้จักมนุษย์" บนเส้นทางนั้น
          เธอได้พบกับผู้คนหลากหลาย ได้พบกับเรื่องราวมากมายที่กำลังรออยู่
        </p>

        <GenreComponent />
      </div>

      <ContextComponent />
    </div>
  )
}
