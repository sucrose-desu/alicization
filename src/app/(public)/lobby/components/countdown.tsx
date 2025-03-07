'use client'

import { useCountdownTimer } from '@/hooks'

export default function CountdownComponent() {
  // __STATE's
  const { duration, pause, resume } = useCountdownTimer(
    (new Date('2026-01-01T00:00:00.000+07:00').getTime() - Date.now()) / 1e3
  )

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <div className='mb-8'>
      <div className='grid grid-flow-col justify-start gap-8'>
        <div className='grid grid-flow-col items-center justify-start gap-4 text-center'>
          <div className='grid'>
            <p className='text-xl font-bold'>{duration.years}</p>
            <p className='text-[10px] font-light uppercase'>years</p>
          </div>

          <div className='grid'>
            <p className='text-xl font-bold'>{duration.months}</p>
            <p className='text-[10px] font-light uppercase'>months</p>
          </div>

          <div className='grid'>
            <p className='text-xl font-bold'>{duration.days}</p>
            <p className='text-[10px] font-light uppercase'>days</p>
          </div>

          <div className='grid'>
            <p className='text-xl font-bold'>{duration.hours}</p>
            <p className='text-[10px] font-light uppercase'>hours</p>
          </div>

          <div className='grid'>
            <p className='text-xl font-bold'>{duration.minutes}</p>
            <p className='text-[10px] font-light uppercase'>minutes</p>
          </div>

          <div className='grid'>
            <p className='text-xl font-bold'>{duration.seconds}</p>
            <p className='text-[10px] font-light uppercase'>seconds</p>
          </div>
        </div>

        <div className='grid grid-flow-col items-center justify-start gap-4'>
          <button className='btn btn-primary h-full px-6' type='button' onClick={pause}>
            <span className='text capitalize'>pause</span>
          </button>

          <button className='btn btn-primary h-full px-6' type='button' onClick={resume}>
            <span className='text capitalize'>resume</span>
          </button>
        </div>
      </div>
    </div>
  )
}
