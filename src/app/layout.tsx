import { fontInter, fontThai } from '@/constants/fonts'
import { cls } from '@/libs/utils'

import '@/styles/globals.css'

export { metadata, viewport } from '@/constants/metadata'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en-UK' className='dark' style={{ colorScheme: 'dark' }}>
      <head>
        <link rel='preconnect' href='https://picsum.photos' />
      </head>

      <body
        className={cls('overflow-x-hidden antialiased', fontInter.variable, fontThai.variable)}
        style={{
          backgroundColor: '#040404',
          textRendering: 'optimizeLegibility'
        }}>
        {children}
      </body>
    </html>
  )
}
