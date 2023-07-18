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
      // console.log(res);
      setAllComments([...res]); 
    }).catch((err) => console.log(err))
  },[checkNewComment])

  return (
    <div>
      <hr />
      {
        allComments.length > 0 ?
          allComments.map((ele, i) => 
          <div className='comment' key={i}>
            <p className='comment-body'>{ ele.comment }</p>
            <p className='comment-author'>{ ele.name }</p>
            <hr />
          </div> )
        : <div>댓글이 없습니다</div>
      }
      <div>댓글 작성하기</div>
      <input onChange={(e)=>{ setComment(e.target.value) }} />
      <button onClick={()=>{
        console.log(comment);
        fetch('/api/comment/write', { method : 'POST', body: JSON.stringify({comment: comment, postId: postId}) })
        .then((res)=>{ return res.json(); })
        .then((res) => {
          if(res.acknowledged === true) setCheckNewComment(!checkNewComment);
        }).catch((err) => console.log(err))
      }}>댓글달기</button>
    </div>
  )
}