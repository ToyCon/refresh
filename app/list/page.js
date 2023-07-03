import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {

  console.log('/app/list/page.js에서 실행합니다')

  const db = (await connectDB).db("board");
  let result = await db.collection('post').find().toArray();
  console.log(result);
    
  return (
    <div className="list-bg">
      { 
        result.map((e,i) => {
          return (
            <div className="list-item" key={i}>
              <Link href={`./detail/${e._id}`}>
                <h4>{e.title}</h4>
              </Link>
              <Link href={`./edit/${e._id}`}>✏️</Link>
              <p>1월 1일</p>
            </div>
          )
        })
      }
    </div>
  )
} 