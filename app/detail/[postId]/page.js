import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  
  console.log('/app/detail/[postId]/page.js');
  console.log(props);
  const db = (await connectDB).db("board");
  let result = await db.collection('post').findOne({_id: new ObjectId(props.params.postId)});
  console.log(result);
  
  return (
    <div>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  )
}