'use client'

import { getServerSession } from "next-auth"
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Write() {
  let isLogin = await getServerSession(authOptions);
  console.log(isLogin);

  if(!isLogin){
    return(
      <div className="p-20">
        <h4>로그인 후 작성 가능합니다</h4>
      </div>
    )
  } else {
    return (
      <div className="p-20">
        <h4>작성하기</h4>  
        <form action='/api/post/write' method="POST">
          <input type="text" name="title" palceholder="글 제목을 입력하세요" required />
          <input type="text" name="content" palceholder="글 내용을 입력하세요" required />
          <button type='submit'>작성하기</button>
        </form>
      </div>
    )
  }
  
}