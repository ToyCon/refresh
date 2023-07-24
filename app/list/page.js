import { connectDB } from "@/util/database";
import ListItem from "./listitem";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function List() {

  // console.log('/app/list/page.js에서 실행합니다')

  const db = (await connectDB).db("board");
  let result = await db.collection('post').find().toArray();
  result = result.map((e)=>{
    e._id = e._id.toString()
    return e
  })
  // console.log(result);
    
  return (
    <div className="list-bg">
      <ListItem result={result} />
      <Link href='/write'>글 작성하기</Link>
    </div>
  )
} 