'use client'

import Link from "next/link"

export default function ListItem({ result }){
  // console.log(result);
  return(
    <div>
      { 
        result.map((e,i) => {
          return (
            <div className="list-item" key={i}>
              <Link href={`./detail/${e._id}`}>
                <h4>{e.title}</h4>
              </Link>
              <Link href={`./edit/${e._id}`}>✏️</Link>
              <span onClick={(ele)=>{
                fetch('/api/post/delete', {
                  method : 'POST',
                  body: JSON.stringify({_id:e._id, author:e.author})
                })
                .then((res)=>{return res.json()})
                .then((res)=>{
                  if(res.acknowledged) {
                    ele.target.parentElement.style.opacity = 0;
                  setTimeout(() => {ele.target.parentElement.style.display = 'none';}, 1000);
                  }
                }).catch((err)=>{console.log(err)})
                }}>🗑️</span>
              <p>1월 1일</p>
            </div>
          )
        })
      }
    </div>
  )
}