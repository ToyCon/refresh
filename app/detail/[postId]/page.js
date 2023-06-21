import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db('board');
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.postId)});
  console.log(props.params.postId);
  
  return (
    <div><p>상세페이지</p>
    <p>{result.title}</p>
    <p>{result.content}</p>
    </div>
  )
}