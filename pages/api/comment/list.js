import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log('/pages/api/comment/list.js에서 실행합니다');
  console.log(req.query);

  if(!req.query.postId) {
    return res.status(400).json('post id가 없습니다')
  }

  if(req.method === 'GET') {
    
    const db = (await connectDB).db("board");
    let result = await db.collection("comment")
      .find({ postId: new ObjectId(req.query.postId) }).toArray();
    console.log(result);

    if(result.length === 0) {
      return res.status(200).json('댓글이 없습니다');
    } else if(result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json('댓글을 불러오지 못했습니다')
    }
    
  } else {
    return res.status(400).json('잘못된 요청입니다')
  }
}