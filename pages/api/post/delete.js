import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log('/api/post/delete.js에서 실행합니다');
  console.log('**');
  console.log(req.body);

  if(req.method === "DELETE") {

    if(!req.body) {
      return res.status(500).json('글 id가 포함되어 있지 않습니다');  
    }
    
    const db = (await connectDB).db('board');
    let result = await db.collection('post').deleteOne(
      {_id: new ObjectId(req.body)}
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