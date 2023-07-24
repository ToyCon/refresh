import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { cookies } from 'next/headers'
import DarkBtn from './DarkBtn'
import LightBtn from './LightBtn'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'refresh',
  description: 'Nextjs Project by ToyCon',
}

export default async function RootLayout({ children }) {
  //로그인 여부 확인  
  let session = await getServerSession(authOptions);
  // console.log(session);
  
  //다크모드 관련 쿠키 체크
  let checkDarkMode = cookies().get('mode');
  // console.log(checkDarkMode);
  // 해당 쿠키가 없을 경우 오브젝트 타입으로 덮어씌우기
  if(checkDarkMode === undefined) {
    checkDarkMode = {
      name: 'mode',
      value: 'light'
    }
  }
  // mode라는 쿠키는 있는데 값이 다를 경우, 디폴트값 light로 덮어 씌우기
  if(checkDarkMode.value !== 'light' && checkDarkMode.value !== 'dark') 
    checkDarkMode.value = 'light';
  
  return (
    <html>
      <body className={ checkDarkMode.value === 'dark' ? 'dark-mode' : '' }>
        <div className='navbar'>
          <Link href='/' className='logo'>Refresh</Link>
          <Link href='/list'>List</Link>
          { session ? <span><span>{ session.user.name }</span><span>&nbsp;&nbsp;&nbsp;</span><LogoutBtn /></span>: <LoginBtn />}
          <span>&nbsp;&nbsp;&nbsp;</span>
          {checkDarkMode.value === 'light' ? <DarkBtn /> : <LightBtn />}
        </div>
        {children}
      </body>
    </html>
  )
}
