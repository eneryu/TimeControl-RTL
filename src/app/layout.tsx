import type { Metadata } from 'next'
import { Noto_Kufi_Arabic } from 'next/font/google'
import './globals.css'

const kufi = Noto_Kufi_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-kufi',
})

export const metadata: Metadata = {
  title: 'تحكم الوقت - مؤقت بومودورو',
  description: 'تطبيق لإدارة الوقت وتتبع جلسات التركيز باستخدام تقنية بومودورو',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={kufi.variable}>
      <body>{children}</body>
    </html>
  )
} 