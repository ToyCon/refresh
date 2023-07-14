'use client'

import { useEffect, useState } from "react"

export default function Comment({ postId }) {
  let [comment, setComment] = useState('');
  let [allComments, setAllComments] = useState([]);

  useEffect(()=>{
    fetch(`/api/comment/list?postId=${postId}`, { method: 'GET'})
    .then((res)=> { return res.json(); })
    .then((res) => { 
      console.log(res);
      setAllComments([...res]); 
    }).catch((err) => console.log(err))
  },[])

  return (
    <div>
      {
        allComments.length > 0 ?
          allComments.map((ele, i) => 
          <div key={i}>
            <p>{ ele.comment }</p>
            <p>{ ele.name }</p>
          </div> )
        : <div>댓글이 없습니다</div>
      }
      <div>댓글 작성하기</div>
      <input onChange={(e)=>{ setComment(e.target.value) }} />
      <button onClick={()=>{
        console.log(comment);
        fetch('/api/comment/write', { method : 'POST', body: JSON.stringify({comment: comment, postId: postId}) })
        .then((res)=>{
          console.log(res.status)
        })
      }}>댓글달기</button>
    </div>
  )
}