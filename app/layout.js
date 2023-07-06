import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'refresh',
  description: 'Nextjs Project by ToyCon',
}

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <html>
      <body>
        <div className='navbar'>
          <Link href='/' className='logo'>Refresh</Link>
          <Link href='/list'>List</Link>
          { session ? <span><span>{ session.user.name }</span><span>&nbsp;&nbsp;&nbsp;</span><LogoutBtn /></span>: <LoginBtn />}
        </div>
        {children}
      </body>
    </html>
  )
}
