import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  console.log('/app/edit/[postId]/page.js');
  console.log(props);
  const db = (await connectDB).db("board");
  let result = await db.collection('post').findOne({_id: new ObjectId(props.params.postId)});
  console.log(result);
  
  return (
    <div className="p-20">
      <h4>글 수정하기</h4>
      <form action='/api/post/edit' method="POST">
        <input style={{display: 'none'}} name="_id" defaultValue={result._id.toString()} />  
        <input name="title" defaultValue={result.title} required />
        <input name="content" defaultValue={result.content} required />  
        <button type='submit'>수정하기</button>
      </form>
    </div>
  )
}