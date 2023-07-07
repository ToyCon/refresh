'use client'

import { useState } from "react"

export default function Comment({ postId }) {
  let [comment, setComment] = useState(new String('댓글을 입력하세요'));

  return (
    <div>
      <div>댓글</div>
      <input onChange={(e)=>{ setComment(e.target.value) }} />
      <button onClick={()=>{
        console.log(comment);
        fetch('URL', { method : 'POST', body: {comment: comment, post: postId} })
      }}>댓글달기</button>
    </div>
  )
}