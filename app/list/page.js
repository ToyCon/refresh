import { connectDB } from "@/util/database"
import Link from 'next/link'
import DetailLink from "./DetailLink";

export default async function List() {
  
  const db = (await connectDB).db('board');
  let result = await db.collection('post').find().toArray();
  
  return (
    <div className="list-bg">
      {
        result.map((e, i) => {
          return (
            <div className="list-item" key={i}>
              <Link href={`/detail/${e._id}`}>
                <h4>{result[i].title}</h4>
              </Link>
              <Link href={`/edit/${e._id}`}>글 수정하기</Link>
              {/* <DetailLink/> */}
              <p>1월 1일</p>
            </div>
          )
        })
      }   
    </div>
  )
}