import { connectDB } from "@/util/database";
import ListItem from "./listitem";

export const dynamic = 'force-dynamic';

export default async function List() {

  console.log('/app/list/page.js에서 실행합니다')

  const db = (await connectDB).db("board");
  let result = await db.collection('post').find().toArray();
  result = result.map((e)=>{
    e._id = e._id.toString()
    return e
  })
  console.log(result);
    
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  )
} 