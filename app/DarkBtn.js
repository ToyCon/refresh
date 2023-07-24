'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DarkBtn() {
  let router = useRouter();

  useEffect(()=>{
    //mode라는 이름의 쿠키가 있는지 확인
    let darkCheck = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
    //해당 쿠키가 없으면 생성
    if( darkCheck === '') {
      document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
    }
  },[])
  
  return (
    <span onClick={() => {
      document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400);
      router.refresh();
    }}>🌙</span> 
  )
}
