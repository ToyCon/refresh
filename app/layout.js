import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'refresh',
  description: 'Nextjs Project by ToyCon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='navbar'>
          <Link href='/' className='logo'>Refresh</Link>
          <Link href='/list'>List</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
