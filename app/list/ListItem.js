'use client'

import Link from "next/link"

export default function ListItem({ result }) {
  
  return (
    <div>
      {
        result.map((e, i) => {
          return (
            <div className="list-item" key={i}>
              <Link href={`/detail/${e._id}`}>
                <h4>{result[i].title}</h4>
              </Link>
              <Link href={`/edit/${e._id}`}>✏️</Link>
              <span onClick={() => {
                fetch('/api/post/delete', { 
                  method: 'DELETE',
                  body: e._id
                })
              }} id={e._id}>🗑️</span>
              <p>1월 1일</p>
            </div>
          )
        })
      }     
    </div>
  )
}