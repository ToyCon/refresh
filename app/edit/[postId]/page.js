import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {

  const db = (await connectDB).db('board');
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.postId)});
  // console.log(result);
  
  return (
    <div className="p-20">
      <h4>글 수정하기</h4>
      <form action="/api/post/patch" method="PATCH">
        <div>
          <label for="title">글 제목을 입력하세요</label>
          <input type="text" name="title" defaultValue={result.title} />
        </div>
        <div>
          <label for="content">글 내용을 입력하세요</label>
          <input type="text" name="content" defaultValue={result.content} />
        </div>
        <button type="submmit">글 수정하기</button>
      </form>
    </div>
  )  
}