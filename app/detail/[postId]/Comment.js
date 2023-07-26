'use client'

import { useEffect, useState } from "react"

export default function Comment({ postId }) {
  let [comment, setComment] = useState('');
  let [allComments, setAllComments] = useState([]);
  let [checkNewComment, setCheckNewComment] = useState(false);

  useEffect(()=>{
    fetch(`/api/comment/list?postId=${postId}`, { method: 'GET'})
    .then((res)=> { return res.json(); })
    .then((res) => { 
      if(Array.isArray(res)) { setAllComments([...res]); }
    }).catch((err) => console.log(err))
  },[checkNewComment])

  return (
    <div>
      <hr />
      {
        allComments.length > 0 ?
          allComments.map((ele, i) => 
          <div key={i}>
            <p>{ ele.comment }</p>
            <p><span>{ ele.name }</span> <span>{ele.commentTime}</span></p>
          </div> )
        : <div>댓글이 없습니다</div>
      }
      <div>댓글 작성하기</div>
      <input className="comment-input" onChange={(e)=>{ setComment(e.target.value) }} />
      <button onClick={()=>{
        // console.log(comment);
        fetch('/api/comment/write', { method : 'POST', body: JSON.stringify({comment: comment, postId: postId}) })
        .then((res)=>{ return res.json()})
        .then((res) => {if(res.acknowledged === true) setCheckNewComment(!checkNewComment)})
        .catch((err) => console.log(err))
      }}>댓글달기</button>
    </div>
  )
}