import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // url 파라미터 문법으로 삭제기능 구현하기 위해서 만든 컴포넌트
  console.log('/api/abc/[id].js에서 실행합니다');
  console.log(req.query);

  if(req.query.id) {
    const db = (await connectDB).db('board');
    let result = await db.collection('post').deleteOne(
      {_id: new ObjectId(req.query.id)}
    );
    console.log(result);

    if(result) {
      return res.status(200).json('게시물이 삭제되었습니다');  
    } else {
      return res.status(500).err('글을 삭제할 수 없습니다');
    }
  } else {
    return res.status(400);
  }
}