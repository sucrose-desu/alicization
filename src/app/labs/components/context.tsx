'use client'

import { useCallback } from 'react'

import { dialog, notice, toast } from '@/components/addons'
import { useLoader } from '@/hooks'

export function ContextComponent() {
  // __STATE's
  const loader = useLoader()

  // __FUNCTION's
  const handleLoader = useCallback(() => {
    loader.on()
    loader.off(2e3)
  }, [])

  const handleNotice = useCallback(() => {
    notice.success('Generate Lorem Ipsum placeholder text.', { title: 'Successful', duration: 5 })
  }, [])

  const handleToast = useCallback(() => {
    toast.on('Generate Lorem Ipsum placeholder text.')
  }, [])

  const handleModal = useCallback(() => {
    dialog.modal('Generate Lorem Ipsum placeholder text.', { allowEscape: true })
  }, [])

  const handleAlert = useCallback(() => {
    dialog.alert('Generate Lorem Ipsum placeholder text.')
  }, [])

  const handleConfirm = useCallback(async () => {
    const r = await dialog.confirm('Generate Lorem Ipsum placeholder text.', {
      title: 'Confirm dialog',
      useInput: true
    })

    console.table(r)
  }, [])

  // __RENDER
  return (
    <div className='grid grid-flow-col justify-start gap-5'>
      <button className='btn btn-primary btn-clicky h-10 px-8' type='button' onClick={handleLoader}>
        <span className='text capitalize'>use loader</span>
      </button>

      <button className='btn btn-primary btn-clicky h-10 px-8' type='button' onClick={handleNotice}>
        <span className='text capitalize'>use notice</span>
      </button>

      <button className='btn btn-primary btn-clicky h-10 px-8' type='button' onClick={handleToast}>
        <span className='text capitalize'>use toast</span>
      </button>

      <button className='btn btn-primary btn-clicky h-10 px-8' type='button' onClick={handleAlert}>
        <span className='text capitalize'>use alert</span>
      </button>

      <button className='btn btn-primary btn-clicky h-10 px-8' type='button' onClick={handleConfirm}>
        <span className='text capitalize'>use confirm</span>
      </button>

      <button className='btn btn-primary btn-clicky h-10 px-8' type='button' onClick={handleModal}>
        <span className='text capitalize'>use modal</span>
      </button>
    </div>
  )
}
